"use client"

import React, { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FiX, FiMove, FiSquare, FiMaximize2, FiCpu, FiShuffle, FiLayout, FiGrid, FiImage, FiCrop } from "react-icons/fi"
import { BsLayoutSplit } from "react-icons/bs"
import { RxSpaceBetweenHorizontally, RxSpaceBetweenVertically } from "react-icons/rx"

type SortableGalleryProps = {
  images: string[]
  onChange: (images: string[]) => void
}

function SortableItem({ item, onRemove, onChangeSpan, onChangeFit }: { item: string, onRemove: (item: string) => void, onChangeSpan: (item: string, newSpan: string) => void, onChangeFit: (item: string, newFit: string) => void }) {
  const parts = item.split("|")
  const url = parts[0]
  const span = parts[1] || "small"
  const fit = parts[2] || "cover"
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.8 : 1,
  }

  // Admin panelde frontend ile aynı grid span sınıflarını kullan
  let spanClass = "bento-small"
  if (span === "wide") spanClass = "bento-wide"
  if (span === "tall") spanClass = "bento-tall"
  if (span === "large") spanClass = "bento-large"

  return (
    <div 
      ref={setNodeRef} 
      style={{ ...style, ...(fit === "contain" ? { "--bg-img": `url(${url})` } as any : {}) }} 
      className={`sortable-item ${spanClass} ${isDragging ? "dragging" : ""} ${fit === "contain" ? "contain-mode" : ""}`}
    >
      <img src={url} alt="Gallery item" style={{ objectFit: "cover", background: "transparent", position: "relative", zIndex: 1 }} />
      <div className="item-actions">
        <div className="drag-handle" {...attributes} {...listeners} title="Sürükle">
          <FiMove />
        </div>
        <button type="button" className="remove-btn" onClick={() => onRemove(item)} title="Sil">
          <FiX />
        </button>
      </div>
      <div className="span-actions">
        <button type="button" className={span === "small" ? "active" : ""} onClick={() => onChangeSpan(item, "small")} title="Kare (1x1)"><FiSquare /></button>
        <button type="button" className={span === "wide" ? "active" : ""} onClick={() => onChangeSpan(item, "wide")} title="Yatay Geniş (2x1)"><RxSpaceBetweenHorizontally /></button>
        <button type="button" className={span === "tall" ? "active" : ""} onClick={() => onChangeSpan(item, "tall")} title="Dikey Uzun (1x2)"><RxSpaceBetweenVertically /></button>
        <button type="button" className={span === "large" ? "active" : ""} onClick={() => onChangeSpan(item, "large")} title="Dev (2x2)"><FiMaximize2 /></button>
      </div>
    </div>
  )
}

export default function SortableGallery({ images, onChange }: SortableGalleryProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = images.indexOf(active.id as string)
      const newIndex = images.indexOf(over.id as string)
      onChange(arrayMove(images, oldIndex, newIndex))
    }
  }

  const handleRemove = (itemToRemove: string) => {
    onChange(images.filter(item => item !== itemToRemove))
  }

  const handleChangeSpan = (item: string, newSpan: string) => {
    const parts = item.split("|")
    const url = parts[0]
    const currentFit = parts[2] || "cover"
    const newItem = `${url}|${newSpan}|${currentFit}`
    onChange(images.map(img => img === item ? newItem : img))
  }

  const handleChangeFit = (item: string, newFit: string) => {
    const parts = item.split("|")
    const url = parts[0]
    const span = parts[1] || "small"
    const newItem = `${url}|${span}|${newFit}`
    onChange(images.map(img => img === item ? newItem : img))
  }

  const handleAutoLayout = async () => {
    // Tüm görsellerin boyutlarını hesaplayıp en uygun bento shape'i ata
    const updatedImages = await Promise.all(images.map(async (item) => {
      const [url] = item.split("|");
      return new Promise<string>((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const ratio = img.naturalWidth / img.naturalHeight;
          let newSpan = "small";
          if (ratio > 1.2) {
            newSpan = "wide"; // Geniş
          } else if (ratio < 0.85) {
            newSpan = "tall"; // Uzun
          } else if (img.naturalWidth > 1200 && ratio >= 0.85 && ratio <= 1.2) {
            newSpan = "large"; // Dev kare
          }
          const parts = item.split("|")
          const currentFit = parts[2] || "cover"
          resolve(`${url}|${newSpan}|${currentFit}`);
        };
        img.onerror = () => resolve(`${url}|small|cover`);
        img.src = url;
      });
    }));
    onChange(updatedImages);
  }

  const handleShuffle = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    onChange(shuffled);
  }

  const handlePresetLayout = (preset: number) => {
    const updated = images.map((item, index) => {
      const parts = item.split("|");
      const url = parts[0];
      const currentFit = parts[2] || "cover";
      let newSpan = "small";
      if (preset === 1) { // 1 large, 4 small
        if (index % 5 === 0) newSpan = "large";
      } else if (preset === 2) { // 1 wide, rest small
        if (index % 4 === 0) newSpan = "wide";
      } else if (preset === 3) { // Masonry mix
        const mod = index % 4;
        if (mod === 0) newSpan = "tall";
        else if (mod === 3) newSpan = "wide";
      } else if (preset === 4) { // All small
        newSpan = "small";
      }
      return `${url}|${newSpan}|${currentFit}`;
    });
    onChange(updated);
  }

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="sortable-gallery-wrapper">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button type="button" onClick={() => handlePresetLayout(1)} className="btn-secondary" title="Büyük ve Küçükler">
          <FiLayout size={14} /> Şablon 1
        </button>
        <button type="button" onClick={() => handlePresetLayout(2)} className="btn-secondary" title="Geniş Yataylar">
          <FiGrid size={14} /> Şablon 2
        </button>
        <button type="button" onClick={() => handlePresetLayout(3)} className="btn-secondary" title="Karışık (Dikey/Yatay)">
          <BsLayoutSplit size={14} /> Şablon 3
        </button>
        <button type="button" onClick={() => handlePresetLayout(4)} className="btn-secondary" title="Hepsi Kare">
          <FiSquare size={14} /> Şablon 4
        </button>

        <button type="button" onClick={handleShuffle} className="btn-secondary" style={{ marginLeft: "auto" }}>
          <FiShuffle size={16} /> Karıştır
        </button>

        <button 
          type="button" 
          onClick={handleAutoLayout} 
          className="btn-primary"
        >
          <FiCpu size={18} /> Akıllı Yerleştir
        </button>
      </div>
      <DndContext
        id="dnd-sortable"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images}
          strategy={rectSortingStrategy}
        >
          <div className="sortable-grid">
            {images.map((item) => (
              <SortableItem key={item} item={item} onRemove={handleRemove} onChangeSpan={handleChangeSpan} onChangeFit={handleChangeFit} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
