import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { removeToast } from '../../store/uiSlice';

export const ToastContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.ui.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[120] flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const bgColors = {
          success: 'bg-emerald-600 text-white',
          info: 'bg-primary-container text-white',
          warning: 'bg-amber-600 text-white',
          error: 'bg-red-600 text-white',
        };

        const icons = {
          success: 'check_circle',
          info: 'info',
          warning: 'warning',
          error: 'error',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl transition-all duration-300 ${
              bgColors[toast.type]
            }`}
          >
            <span className="material-symbols-outlined text-[24px] shrink-0 mt-0.5">
              {icons[toast.type]}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
              <p className="text-xs opacity-90 mt-1 leading-relaxed break-words">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => dispatch(removeToast(toast.id))}
              className="text-white/80 hover:text-white p-1 rounded transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
