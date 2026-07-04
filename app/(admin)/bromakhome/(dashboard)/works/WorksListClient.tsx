"use client"

import { useState, useTransition, useEffect } from "react"
import Link from "next/link"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { RxDragHandleDots2 } from "react-icons/rx"
import DeleteButton from "../blog/DeleteButton"
import PublishToggle from "../blog/PublishToggle"
import { deleteBulkWorks, reorderWorks } from "@/app/actions/work"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Work = {
  id: string
  title: string
  slug: string
  client: string
  service: string
  coverImage: string
  published: boolean
  createdAt: Date
}

function SortableTableRow({ 
  work, 
  isSelected, 
  onSelect 
}: { 
  work: Work, 
  isSelected: boolean, 
  onSelect: () => void 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: work.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "#f9fafb" : undefined,
    position: isDragging ? "relative" : "static",
    zIndex: isDragging ? 99 : "auto"
  } as React.CSSProperties;

  return (
    <tr ref={setNodeRef} style={style} className={isSelected ? "selected-row" : ""}>
      <td style={{ width: "40px", cursor: "grab" }} {...attributes} {...listeners}>
        <RxDragHandleDots2 size={20} color="#9ca3af" />
      </td>
      <td className="checkbox-cell">
        <input 
          type="checkbox" 
          className="custom-checkbox"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      <td>
        <div className="post-thumbnail">
          <img src={work.coverImage || "/assets/logos/bromak_kirmizi_logo.svg"} alt={work.title} />
        </div>
      </td>
      <td>
        <strong>{work.title}</strong>
      </td>
      <td>
        <span className="badge-category">{work.client}</span>
      </td>
      <td>
        <PublishToggle id={work.id} published={work.published} type="work" />
      </td>
      <td>
        {new Date(work.createdAt).toLocaleDateString("tr-TR")}
      </td>
      <td className="actions-cell">
        <div className="action-buttons">
          <Link href={`/bromakhome/works/${work.id}/edit`} className="btn-edit">
            <FiEdit size={16} /> Düzenle
          </Link>
          <DeleteButton id={work.id} type="work" />
        </div>
      </td>
    </tr>
  )
}

export default function WorksListClient({ works }: { works: Work[] }) {
  const [items, setItems] = useState(works)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    setItems(works)
  }, [works])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      
      try {
        await reorderWorks(newItems.map(w => w.id));
        toast.success("Sıralama güncellendi");
      } catch (error) {
        toast.error("Sıralama kaydedilemedi");
        setItems(items); // revert
      }
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(items.map(w => w.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleBulkDelete = () => {
    if (!confirm(`Seçili ${selectedIds.length} işi silmek istediğinize emin misiniz?`)) return

    startTransition(async () => {
      try {
        await deleteBulkWorks(selectedIds)
        setSelectedIds([])
        router.refresh()
      } catch (error) {
        alert("Toplu silme işlemi başarısız oldu.")
      }
    })
  }

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>Henüz hiç iş eklenmemiş.</p>
      </div>
    )
  }

  return (
    <>
      {selectedIds.length > 0 && (
        <div className="bulk-actions-bar">
          <span>{selectedIds.length} öğe seçildi</span>
          <button 
            onClick={handleBulkDelete} 
            disabled={isPending}
            className="btn-bulk-delete"
          >
            <FiTrash2 size={16} /> {isPending ? "Siliniyor..." : "Seçilenleri Sil"}
          </button>
        </div>
      )}

      <DndContext 
        id="dnd-works-list"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={items.map(i => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: "40px" }}></th>
                <th className="checkbox-cell">
                  <input 
                    type="checkbox" 
                    className="custom-checkbox"
                    checked={selectedIds.length === items.length && items.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Görsel</th>
                <th>Proje</th>
                <th>Müşteri</th>
                <th>Durum</th>
                <th>Tarih</th>
                <th className="actions-cell">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {items.map((work) => (
                <SortableTableRow 
                  key={work.id} 
                  work={work} 
                  isSelected={selectedIds.includes(work.id)} 
                  onSelect={() => handleSelect(work.id)} 
                />
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </>
  )
}
