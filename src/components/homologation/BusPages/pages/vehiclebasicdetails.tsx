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
  const [formData, setFormData] =
    useState<VehicleBasicDetailsData>(data);

  /* ================= SUCCESS POPUP ================= */

  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();

  /* ================= LOAD DATA FROM PARENT ================= */

  useEffect(() => {
    setFormData(data);
  }, [data]);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    field: keyof VehicleBasicDetailsData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ================= SAVE ================= */

  const handleSave = () => {
    console.log(
      "Vehicle Basic Details:",
      formData
    );

    // Send data to parent
    onSave(formData);

    // Show success popup
    onSuccessOpen();
  };

  /* ================= CANCEL ================= */

  const handleCancel = () => {
    // Restore last saved data from parent
    setFormData(data);
  };

  return (
    <Box
      width="100%"
      pl={{ base: 0, md: 0 }}
      pr={{ base: 5, md: 5 }}
    >
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
          Vehicle Basic Details
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
          {/* Manufacturer */}

          <FormControl>
            <FormLabel
              fontSize="15px"
              fontWeight="500"
              color="#4A5568"
            >
              Details of Vehicle Manufacturer
            </FormLabel>

            <InputWithInfo
              value={formData.manufacturer}
              onChange={(value) =>
                handleChange(
                  "manufacturer",
                  value
                )
              }
            />
          </FormControl>

          {/* Address */}

          <FormControl>
            <FormLabel
              fontSize="15px"
              fontWeight="500"
              color="#4A5568"
            >
              Name and address of the Manufacturer
            </FormLabel>

            <InputWithInfo
              value={
                formData.manufacturerAddress
              }
              onChange={(value) =>
                handleChange(
                  "manufacturerAddress",
                  value
                )
              }
            />
          </FormControl>

          {/* Telephone */}

          <FormControl>
            <FormLabel
              fontSize="15px"
              fontWeight="500"
              color="#4A5568"
            >
              Telephone Number
            </FormLabel>

            <InputWithInfo
              value={formData.telephone}
              onChange={(value) =>
                handleChange(
                  "telephone",
                  value
                )
              }
            />
          </FormControl>

          {/* Fax */}

          <FormControl>
            <FormLabel
              fontSize="15px"
              fontWeight="500"
              color="#4A5568"
            >
              Fax No
            </FormLabel>

            <InputWithInfo
              value={formData.fax}
              onChange={(value) =>
                handleChange(
                  "fax",
                  value
                )
              }
            />
          </FormControl>

          {/* Email */}

          <FormControl>
            <FormLabel
              fontSize="15px"
              fontWeight="500"
              color="#4A5568"
            >
              Email ID
            </FormLabel>

            <InputWithInfo
              type="email"
              value={formData.email}
              onChange={(value) =>
                handleChange(
                  "email",
                  value
                )
              }
            />
          </FormControl>

          {/* Contact Person */}

          <FormControl>
            <FormLabel
              fontSize="15px"
              fontWeight="500"
              color="#4A5568"
            >
              Contact Person
            </FormLabel>

            <InputWithInfo
              value={formData.contactPerson}
              onChange={(value) =>
                handleChange(
                  "contactPerson",
                  value
                )
              }
            />
          </FormControl>

          {/* Model Variant */}

          <FormControl>
            <FormLabel
              fontSize="15px"
              fontWeight="500"
              color="#4A5568"
            >
              Name of model and variant
            </FormLabel>

            <InputWithInfo
              value={formData.modelVariant}
              onChange={(value) =>
                handleChange(
                  "modelVariant",
                  value
                )
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
              Save
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

      {/* ================= SUCCESS POPUP ================= */}

      <Modal
        isOpen={isSuccessOpen}
        onClose={onSuccessClose}
        isCentered
      >
        <ModalOverlay bg="blackAlpha.500" />

        <ModalContent
          width="390px"
          borderRadius="6px"
          boxShadow="0 4px 20px rgba(0,0,0,0.25)"
        >
          <ModalCloseButton
            fontSize="18px"
            top="12px"
            right="12px"
          />

          <ModalBody py={7}>
            <VStack spacing={5}>
              <HStack spacing={5}>
                <Icon
                  as={CheckCircle}
                  boxSize={32}
                  color="#7AC323"
                />

                <Text
                  fontSize="18px"
                  fontWeight="700"
                  color="#1A202C"
                >
                  Data Saved Successfully
                </Text>
              </HStack>

              <Button
                width="180px"
                bg="#7AC323"
                color="white"
                borderRadius="5px"
                fontSize="16px"
                _hover={{
                  bg: "#68AD1D",
                }}
                onClick={onSuccessClose}
              >
                Close
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default VehicleBasicDetails;