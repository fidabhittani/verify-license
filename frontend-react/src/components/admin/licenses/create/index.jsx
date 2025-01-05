import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router";
import {
  createLicense,
  findLiceneById,
  updateLicense,
} from "../../../../services/license";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import districts from "../../../../utils/districts";
import { useEffect } from "react";

const licensTypesArr = [
  { value: "M-CYCLE", label: "MOTOR CYCLE" },
  { value: "MOTOR-CAR", label: "MOTOR CAR" },
  { value: "LTV", label: "LTV" },
  { value: "HTV", label: "HTV" },
];

export default function CreateLicense() {
  const { refetchLicenses } = useOutletContext();
  const { id } = useParams();

  const { data: licenseData } = useQuery({
    queryKey: ["id", id],
    staleTime: 0,
    queryFn: async () => {
      const data = await findLiceneById(id);
      return data;
    },
    enabled: Boolean(id),
  });

  const {
    handleSubmit,
    control,
    reset,
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
      internationalDrivingPermit: false,
    },
  });

  const mutationLicense = useMutation({
    mutationFn: createLicense,

    onSuccess: () => {
      refetchLicenses();
      navigate("../");
    },
  });
  const mutationUpdateLicense = useMutation({
    mutationFn: updateLicense,

    onSuccess: () => {
      refetchLicenses();
      navigate("../");
    },
  });

  const onSaveLicense = (data) => {
    if (id) {
      mutationUpdateLicense.mutate({ id, data });
    } else {
      mutationLicense.mutate(data);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (licenseData) {
      reset((formValues) => ({
        ...formValues,

        name: licenseData.name,
        fatherName: licenseData.fatherName,
        licenseType: licenseData.licenseType,
        initialLicenseType: licenseData.initialLicenseType,
        cnic: licenseData.cnic,
        licenseNumber: licenseData.licenseNumber,
        district: licenseData.district,
        issueDate: moment(licenseData.issueDate),
        expiryDate: moment(licenseData.expiryDate),
        internationalDrivingPermit: Boolean(licenseData.internationalDrivingPermit),
      }));
      console.log({licenseData});
    }
  }, [licenseData, reset]);

  return (
    <Drawer open={true} anchor="right" hideBackdrop>
      <form onSubmit={handleSubmit(onSaveLicense)}>
        <Card sx={{ width: "25em", height: "100%" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {id ? "Update" : "Create"} License
              {mutationLicense.isPending && <LinearProgress />}
            </Typography>
            <Typography gutterBottom color="error">
              {mutationLicense.error?.message}
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
              <Controller
                name="internationalDrivingPermit"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    control={<Switch checked={value} onChange={onChange} />}
                    label="International Driving Permit"
                  />
                )}
              />
              
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
