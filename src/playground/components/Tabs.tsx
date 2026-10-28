"use client";

import {
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type TabItem = {
  id: string;
  label: string;
  panel: ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  value?: string;
  onValueChange?: (id: string) => void;
  defaultValue?: string;
  ariaLabel?: string;
};

export function Tabs({
  items,
  value,
  onValueChange,
  defaultValue,
  ariaLabel = "Content tabs",
}: TabsProps) {
  const baseId = useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(
    defaultValue ?? items[0]?.id ?? ""
  );
  const selected = isControlled ? value : internal;

  function select(id: string) {
    if (!isControlled) setInternal(id);
    onValueChange?.(id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = items.findIndex((item) => item.id === selected);
    if (index < 0) return;

    let next = index;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % items.length;
        break;
      case "ArrowLeft":
        next = (index - 1 + items.length) % items.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextId = items[next].id;
    select(nextId);
    document.getElementById(`${baseId}-tab-${nextId}`)?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        className="flex flex-wrap gap-1 border-b border-slate-700"
      >
        {items.map((item) => {
          const isSelected = item.id === selected;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => select(item.id)}
              className={
                isSelected
                  ? "rounded-t-md border-b-2 border-indigo-400 px-4 py-2 text-sm font-medium text-white"
                  : "rounded-t-md border-b-2 border-transparent px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const isSelected = item.id === selected;
        return (
          <div
            key={item.id}
            id={`${baseId}-panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${item.id}`}
            hidden={!isSelected}
            tabIndex={0}
            className="mt-4 rounded-md border border-slate-800 bg-slate-900/50 p-4 text-slate-200 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            {isSelected ? item.panel : null}
          </div>
        );
      })}
    </div>
  );
}