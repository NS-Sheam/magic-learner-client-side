import Swal from "sweetalert2";
export const handleDeleteClass = (id, refetch) => {
  Swal.fire({
    title: "Are you sure to want to delete this class?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#28a745",
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://summer-camp-server-side-alpha.vercel.app/classes/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.deletedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Class successfully deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
    }
  });
};
