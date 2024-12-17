import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router";
import { createLicense } from "../../../../services/license";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import districts from "../../../../utils/districts";

const licensTypesArr = [
  { value: "M-CYCLE", label: "MOTOR CYCLE" },
  { value: "MOTOR-CAR", label: "MOTOR CAR" },
  { value: "LTV", label: "LTV" },
  { value: "HTV", label: "HTV" },
];

export default function CreateLicense() {
  const { refetchLicenses } = useOutletContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      fatherName: "",
      licenseType: "MOTOR-CAR",
      initialLicenseType: "MOTOR-CAR",
      cnic: "",
      licenseNumber: "",
      district: "Peshawar",
    },
  });

  const mutationLicense = useMutation({
    mutationFn: createLicense,
    onSuccess: () => {
      refetchLicenses();
      navigate("../");
    },
  });

  const onSaveLicense = (data) => {
    mutationLicense.mutate(data);
  };

  const navigate = useNavigate();
  return (
    <Drawer open={true} anchor="right" hideBackdrop>
      <form onSubmit={handleSubmit(onSaveLicense)}>
        <Card sx={{ width: "25em", height: "100%" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Create License
              {mutationLicense.isPending && <LinearProgress />}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <FormControl fullWidth>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField placeholder="Full Name" {...field} />
                )}
              />

              <FormHelperText sx={{ color: "red" }}>
                {errors.name && "Name is required"}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 1 }}>
              <Controller
                name="fatherName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField placeholder="Father Name" {...field} />
                )}
              />

              <FormHelperText sx={{ color: "red" }}>
                {errors.fatherName && "Father Name is required"}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 1 }}>
              <Controller
                name="cnic"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField placeholder="CNIC" {...field} />
                )}
              />

              <FormHelperText sx={{ color: "red" }}>
                {errors.cnic && "CNIC is required"}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 1 }}>
              <Controller
                name="licenseNumber"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField placeholder="License Number" {...field} />
                )}
              />

              <FormHelperText sx={{ color: "red" }}>
                {errors.licenseNumber && "license Number is required"}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 1 }}>
              <Controller
                name="licenseType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field}>
                    {licensTypesArr.map((item) => {
                      return (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />

              <FormHelperText sx={{ color: "red" }}>
                {errors.licenseType && "licenseType  is required"}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <Controller
                name="issueDate"
                control={control}
                rules={{ required: true }}
                defaultValue={null}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="Issue Date"
                      value={value}
                      control={control}
                      onChange={(event) => onChange(event)}
                      slotProps={{
                        textField: {
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />

              <FormHelperText sx={{ color: "red" }}>
                {errors.issueDate && "issueDate is required"}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <Controller
                name="expiryDate"
                control={control}
                defaultValue={null}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="Expiry Date"
                      value={value}
                      control={control}
                      onChange={(event) => onChange(event)}
                      slotProps={{
                        textField: {
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />

              <FormHelperText sx={{ color: "red" }}>
                {errors.expiryDate && "expiryDate is required"}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 1 }}>
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    {districts.map((district, index) => {
                      return (
                        <MenuItem
                          key={`${index}-index-district`}
                          value={district}
                        >
                          {district}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />

              <FormHelperText sx={{ color: "red" }}>
                {errors.district && "District is required"}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel>Initial license type</InputLabel>

              <Controller
                name="initialLicenseType"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    {licensTypesArr.map((item) => {
                      return (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <Controller
                name="initialLicenseIssueDate"
                control={control}
                defaultValue={moment()}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="Expiry Date"
                      value={value}
                      control={control}
                      onChange={(event) => onChange(event)}
                      slotProps={{
                        textField: {
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
                initialLicenseIssueDate
              />
            </FormControl>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigate("../")}>
              Cancel
            </Button>
            <Button size="small" variant="contained" type="submit">
              Save
            </Button>
          </CardActions>
        </Card>
      </form>
    </Drawer>
  );
}
