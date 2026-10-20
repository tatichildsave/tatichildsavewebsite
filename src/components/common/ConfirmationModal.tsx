import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeConfirmationModal } from '../../store/uiSlice';

interface ConfirmationModalProps {
  onConfirm: () => void;
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  isLoading = false,
}) => {
  const dispatch = useAppDispatch();
  const { confirmationModal } = useAppSelector((state) => state.ui);

  if (!confirmationModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-lg bg-surface-container-lowest text-on-surface rounded-2xl shadow-2xl border border-surface-container overflow-hidden animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                {confirmationModal.title || 'Confirm Action'}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Google Workspace User Permission Review
              </p>
            </div>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
            {confirmationModal.description}
          </p>

          {confirmationModal.affectedItems && confirmationModal.affectedItems.length > 0 && (
            <div className="bg-surface-container-low rounded-xl p-4 mb-6 border border-surface-container">
              <span className="font-label-caps text-label-caps uppercase text-outline block mb-2 font-bold">
                Operations to be executed:
              </span>
              <ul className="space-y-2">
                {confirmationModal.affectedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-surface-container">
            <button
              type="button"
              onClick={() => dispatch(closeConfirmationModal())}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-lg bg-surface-container text-on-surface font-title-md text-sm hover:bg-surface-container-high transition-colors"
            >
              {confirmationModal.cancelLabel || 'Cancel'}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-md text-sm shadow-md hover:bg-primary transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              <span>{confirmationModal.confirmLabel || 'Confirm & Proceed'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
