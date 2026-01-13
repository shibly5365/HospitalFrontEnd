import React from "react";
import CancelAppointment from "../appoint/CancelAppointment";
import ViewModal from "../appoint/ViewModal";
import EditModal from "../appoint/EditModal";
import RescheduleAppointment from "../appoint/RescheduleAppointment";


export default function Modals({
  editAppointment,
  selectedAppointment,
  rescheduleAppointment,
  cancelAppointment,
  openMenu,
  setEditAppointment,
  setSelectedAppointment,
  setRescheduleAppointment,
  setCancelAppointment,
  setOpenMenu,
  onSaveEdit,
  onCancelAppointment,
  onReschedule,
  onCancelSuccess,
  onRescheduleSuccess,
}) {
  console.log("fsdfsafsad",rescheduleAppointment);
  
  return (
    <>
      {editAppointment && (
        <EditModal
          appointment={editAppointment}
          onSave={onSaveEdit}
          onClose={() => setEditAppointment(null)}
        />
      )}

      {selectedAppointment && (
        <ViewModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onEdit={(appt) => {
            setEditAppointment(appt);
            setSelectedAppointment(null);
          }}
          onCancel={onCancelAppointment}
          onReschedule={onReschedule}
        />
      )}

      {rescheduleAppointment && (
        <RescheduleAppointment
          appointment={rescheduleAppointment}
          onClose={() => setRescheduleAppointment(null)}
          onSuccess={onRescheduleSuccess}
        />
      )}

      {cancelAppointment && (
        <CancelAppointment
          appointment={cancelAppointment}
          onClose={() => setCancelAppointment(null)}
          onSuccess={onCancelSuccess}
        />
      )}

      {/* Click outside to close dropdown */}
      {(openMenu || selectedAppointment || editAppointment) && (
        <div
          className="fixed inset-0 z-10"
          onClick={(e) => {
            setOpenMenu(null);
            if (!selectedAppointment && !editAppointment) return;
            if (e.target === e.currentTarget) {
              setSelectedAppointment(null);
              setEditAppointment(null);
            }
          }}
        ></div>
      )}
    </>
  );
}