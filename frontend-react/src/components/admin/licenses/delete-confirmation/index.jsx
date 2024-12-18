import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { deleteLicense } from "../../../../services/license";

const DeleteConfirmation = () => {
  const { refetchLicenses } = useOutletContext();
  const { id } = useParams();

  const deleteLicenseMutation = useMutation({
    mutationFn: deleteLicense,

    onSuccess: () => {
      refetchLicenses();
      navigate("../");
    },
  });

  const onDelete = () => {
    deleteLicenseMutation.mutate(id);
  };

  const navigate = useNavigate();
  return (
    <Dialog
      open={true}
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
    >
      <DialogTitle id="delete-confirmation-title">
        {"Are you sure?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-confirmation-description">
          Are you sure you want to delete this license, this will be deleted
          permanently
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate("../")}>Cancel</Button>
        <Button onClick={onDelete} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
