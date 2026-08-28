import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Icon,
} from "@chakra-ui/react";

import { Info, CheckCircle } from "lucide-react";
import {
  BusFormData,
  VehicleBasicDetailsData,
} from "../formData/BusFormData";
/* ================= DATA TYPE ================= */


type VehicleBasicDetailsProps = {
  data: BusFormData["vehicleBasicDetails"];

  onSave: (
    data: BusFormData["vehicleBasicDetails"]
  ) => void;
};

/* ================= INPUT WITH INFO ================= */

const InputWithInfo = ({
  value,
  onChange,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) => {
  return (
    <HStack
      spacing={2}
      width="100%"
      align="center"
    >
      <Input
        size="md"
        height="42px"
        fontSize="15px"
        type={type}
        flex="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <Box
        minW="24px"
        h="24px"
        borderRadius="50%"
        bg="#3375BA"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Info
          size={14}
          color="white"
          strokeWidth={2.5}
        />
      </Box>
    </HStack>
  );
};

/* ================= COMPONENT ================= */

const VehicleBasicDetails = ({
  data,
  onSave,
}: VehicleBasicDetailsProps) => {
  const [activeVBD, setActiveVBD] = useState(1);

const [vehicleData, setVehicleData] =
  useState<Record<number, VehicleBasicDetailsData>>(data);

const currentData = vehicleData[activeVBD];

useEffect(() => {
  setVehicleData(data);
}, [data]);

  /* ================= SUCCESS POPUP ================= */

  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();


  

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
  field: keyof VehicleBasicDetailsData,
  value: string
) => {
  setVehicleData((prev) => ({
    ...prev,
    [activeVBD]: {
      ...prev[activeVBD],
      [field]: value,
    },
  }));
};

  /* ================= SAVE ================= */

const handleSave = () => {
  console.log(
    `VBD ${activeVBD} data:`,
    currentData
  );

  onSave(vehicleData);
};

  /* ================= CANCEL ================= */

  const handleCancel = () => {
  setVehicleData((prev) => ({
    ...prev,
    [activeVBD]: {
      ...data[activeVBD],
    },
  }));
};

  return (
    <Box
      width="100%"
      pl={{ base: 0, md: 0 }}
      pr={{ base: 5, md: 5 }}
    >

      <Box
  display="flex"
  justifyContent="flex-start"
  width="100%"
  mb={6}
>
  <HStack spacing={2}>
    {[1, 2, 3].map((vbd) => (
      <Button
        key={vbd}
        size="md"
        borderRadius="4px"
        px={7}
        py={6}
        bg={
          activeVBD === vbd
            ? "#3375BA"
            : "white"
        }
        color={
          activeVBD === vbd
            ? "white"
            : "#4A5568"
        }
        border="1px solid #E2E8F0"
        fontSize="15px"
        fontWeight="600"
        isDisabled={vbd === 2 || vbd === 3}
        _hover={{
          bg:
            activeVBD === vbd
              ? "#2865A5"
              : "#F7FAFC",
        }}
        onClick={() => setActiveVBD(vbd)}
      >
        VBD {vbd}
      </Button>
    ))}
  </HStack>
</Box>
      {/* ================= CARD ================= */}

      <Box
        bg="white"
        borderRadius="8px"
        p={{ base: 5, md: 8 }}
        width="100%"
        minH="550px"
        boxShadow="0 1px 4px rgba(0,0,0,0.12)"
      >
        {/* ================= HEADING ================= */}

        <Text
          fontSize={{ base: "18px", md: "21px" }}
          fontWeight="700"
          color="#17365D"
          mb={6}
          textAlign="left"
        >
          Vehicle Basic Details — VBD {activeVBD}
        </Text>

        <Box
          borderTop="1px solid #E5E7EB"
          mb={7}
        />

        {/* ================= FORM ================= */}

        <SimpleGrid
  columns={{
    base: 1,
    md: 2,
    lg: 3,
  }}
  spacingX={8}
  spacingY={7}
>
  {/* Overall Length */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Overall Length mm
    </FormLabel>

    <InputWithInfo
      value={currentData.overallLength}
      onChange={(value) =>
        handleChange("overallLength", value)
      }
    />
  </FormControl>

  {/* Total Length */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Total length (mm) (for articulated/combination vehicles)
    </FormLabel>

    <InputWithInfo
      value={currentData.totalLength}
      onChange={(value) =>
        handleChange("totalLength", value)
      }
    />
  </FormControl>

  {/* Overall Width */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Overall Width mm
    </FormLabel>

    <InputWithInfo
      value={currentData.overallWidth}
      onChange={(value) =>
        handleChange("overallWidth", value)
      }
    />
  </FormControl>

  {/* Overall Height */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Overall, Height (Unladen) (mm)
    </FormLabel>

    <InputWithInfo
      value={currentData.overallHeightUnladen}
      onChange={(value) =>
        handleChange("overallHeightUnladen", value)
      }
    />
  </FormControl>

  {/* Wheel Base */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Wheel base (mm)
    </FormLabel>

    <InputWithInfo
      value={currentData.wheelBase}
      onChange={(value) =>
        handleChange("wheelBase", value)
      }
    />
  </FormControl>

  {/* Axle Spacing */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Axle spacing in case of multi axle vehicles.
    </FormLabel>

    <InputWithInfo
      value={currentData.axleSpacing}
      onChange={(value) =>
        handleChange("axleSpacing", value)
      }
    />
  </FormControl>

  {/* Wheel Track - Front */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Front
    </FormLabel>

    <InputWithInfo
      value={currentData.wheelTrackFront}
      onChange={(value) =>
        handleChange("wheelTrackFront", value)
      }
    />
  </FormControl>

  {/* Wheel Track - Rear */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Rear
    </FormLabel>

    <InputWithInfo
      value={currentData.wheelTrackRear}
      onChange={(value) =>
        handleChange("wheelTrackRear", value)
      }
    />
  </FormControl>

  {/* Wheel Track - Other Axles */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Other axles (for articulated/combination vehicles)
    </FormLabel>

    <InputWithInfo
      value={currentData.wheelTrackOtherAxles}
      onChange={(value) =>
        handleChange("wheelTrackOtherAxles", value)
      }
    />
  </FormControl>

  {/* Body Overhang - Front */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Front end
    </FormLabel>

    <InputWithInfo
      value={currentData.bodyOverhangFrontEnd}
      onChange={(value) =>
        handleChange("bodyOverhangFrontEnd", value)
      }
    />
  </FormControl>

  {/* Body Overhang - Rear */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Rear end
    </FormLabel>

    <InputWithInfo
      value={currentData.bodyOverhangRearEnd}
      onChange={(value) =>
        handleChange("bodyOverhangRearEnd", value)
      }
    />
  </FormControl>

  {/* Frame Overhang - Front */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Front end
    </FormLabel>

    <InputWithInfo
      value={currentData.frameOverhangFrontEnd}
      onChange={(value) =>
        handleChange("frameOverhangFrontEnd", value)
      }
    />
  </FormControl>

  {/* Frame Overhang - Rear */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Rear end
    </FormLabel>

    <InputWithInfo
      value={currentData.frameOverhangRearEnd}
      onChange={(value) =>
        handleChange("frameOverhangRearEnd", value)
      }
    />
  </FormControl>

  {/* Load Body Dimensions */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Load Body dimensions (L X B X H) (mm)
    </FormLabel>

    <InputWithInfo
      value={currentData.loadBodyDimensions}
      onChange={(value) =>
        handleChange("loadBodyDimensions", value)
      }
    />
  </FormControl>

  {/* Lateral Projection */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Lateral projection
    </FormLabel>

    <InputWithInfo
      value={currentData.lateralProjection}
      onChange={(value) =>
        handleChange("lateralProjection", value)
      }
    />
  </FormControl>

  {/* Cargo Box - Length */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Length
    </FormLabel>

    <InputWithInfo
      value={currentData.cargoBoxLength}
      onChange={(value) =>
        handleChange("cargoBoxLength", value)
      }
    />
  </FormControl>

  {/* Cargo Box - Width */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Width
    </FormLabel>

    <InputWithInfo
      value={currentData.cargoBoxWidth}
      onChange={(value) =>
        handleChange("cargoBoxWidth", value)
      }
    />
  </FormControl>

  {/* Cargo Box - Height */}
  <FormControl>
    <FormLabel
      fontSize="15px"
      fontWeight="500"
      color="#4A5568"
    >
      Height
    </FormLabel>

    <InputWithInfo
      value={currentData.cargoBoxHeight}
      onChange={(value) =>
        handleChange("cargoBoxHeight", value)
      }
    />
  </FormControl>
</SimpleGrid>

        {/* ================= BUTTONS ================= */}

        <Box
          borderTop="1px solid #E5E7EB"
          mt={10}
          pt={6}
        >
          <HStack spacing={3}>
            {/* SAVE */}

            <Button
              bg="#3375BA"
              color="white"
              size="md"
              px={7}
              fontSize="15px"
              _hover={{
                bg: "#2865A5",
              }}
              onClick={handleSave}
            >
              Submit
            </Button>

            {/* CANCEL */}

            <Button
              type="button"
              variant="outline"
              size="md"
              px={7}
              fontSize="15px"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </HStack>
        </Box>
      </Box>

    </Box>
  );
};

export default VehicleBasicDetails;