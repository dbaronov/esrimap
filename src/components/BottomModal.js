import React, { useEffect, useRef } from 'react';
import './BottomModal.css';

const BottomModal = ({ isOpen, markerData, onClose }) => {
  const modalContentRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Handle focus trap and restoration
  useEffect(() => {
    if (!isOpen) return;

    // Save the element that had focus before modal opened
    previouslyFocusedElement.current = document.activeElement;

    // Focus the close button when modal opens for better discoverability
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (event) => {
      // Handle Escape key to close modal
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      // Focus trap: keep focus within the modal
      if (event.key === 'Tab' && modalContentRef.current) {
        const focusableElements = modalContentRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        // Shift+Tab on first element -> focus last element
        if (event.shiftKey && activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
        // Tab on last element -> focus first element
        else if (!event.shiftKey && activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup: restore focus when modal closes
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElement.current && previouslyFocusedElement.current.focus) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // Handle click outside the modal to close (on the overlay)
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !markerData) {
    return null;
  }

  return (
    <div
      className="bottom-modal-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className="bottom-modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        ref={modalContentRef}
      >
        {/* Close button (X) */}
        <button
          ref={closeButtonRef}
          className="bottom-modal-close"
          onClick={onClose}
          aria-label="Close location information dialog"
          title="Close (Press Escape)"
        >
          ✕
        </button>

        {/* Modal body */}
        <div className="bottom-modal-body">
          {/* Location Name */}
          <h2 className="bottom-modal-title" id="modal-title">
            {markerData.name}
          </h2>
          
          {/* Description Section */}
          {markerData.description && (
            <div className="bottom-modal-section">
              <p className="bottom-modal-description" id="modal-description">
                {markerData.description}
              </p>
            </div>
          )}

          {/* Location Details */}
          <div className="bottom-modal-details">
            <h3 className="bottom-modal-details-title">Location Details</h3>
            
            {markerData.latitude !== undefined && markerData.longitude !== undefined && (
              <>
                <div className="bottom-modal-detail-item">
                  <span className="detail-label">Latitude:</span>
                  <span className="detail-value">{markerData.latitude.toFixed(4)}</span>
                </div>
                <div className="bottom-modal-detail-item">
                  <span className="detail-label">Longitude:</span>
                  <span className="detail-value">{markerData.longitude.toFixed(4)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomModal;
