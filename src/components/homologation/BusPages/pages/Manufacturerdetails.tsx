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
import { CheckCircle, Info } from "lucide-react";
import {
  BusFormData,
  ManufacturerData,
} from "../formData/BusFormData";

type ManufacturerDetailsProps = {
  data: BusFormData["manufacturerDetails"];

  onSave: (
    data: BusFormData["manufacturerDetails"]
  ) => void;
};

const emptyManufacturerData: ManufacturerData = {
  manufacturer: "",
  manufacturerAddress: "",
  telephone: "",
  fax: "",
  email: "",
  contactPerson: "",
  modelVariant: "",
};
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
    <HStack spacing={2} width="100%" align="center">
      <Input
        size="md"
        fontSize="15px"
        height="42px"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        flex="1"
      />

      {/* Info Icon */}
      <Box
        width="24px"
        height="24px"
        minW="24px"
        borderRadius="50%"
        bg="#3375BA"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Info
          size={14}
          color="white"
          strokeWidth={3}
        />
      </Box>
    </HStack>
  );
};

const ManufacturerDetails = ({
  data,
  onSave,
}: ManufacturerDetailsProps) => {  
  const [activeMD, setActiveMD] = useState(1);

  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();

  const [manufacturerData, setManufacturerData] =
  useState<Record<number, ManufacturerData>>(data);

  const currentData = manufacturerData[activeMD];

  const handleChange = (
    field: keyof ManufacturerData,
    value: string
  ) => {
    setManufacturerData((prev) => ({
      ...prev,
      [activeMD]: {
        ...prev[activeMD],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
  console.log(`MD ${activeMD} data:`, currentData);

  // Send all MD1, MD2 and MD3 data to parent
  onSave(manufacturerData);

  // Show success popup
  onSuccessOpen();
};
  return (
    <Box
      width="100%"
      pl={{ base: 0, md: 0 }}
      pr={{ base: 3, md: 25 }}
    >
      {/* MD 1 / MD 2 / MD 3 */}
      <Box
        display="flex"
        justifyContent="flex-start"
        width="100%"
        mb={6}
      >
        <HStack spacing={2}>
          {[1, 2, 3].map((md) => (
            <Button
              key={md}
              size="md"
              borderRadius="4px"
              px={7}
              py={6}
              bg={activeMD === md ? "#3375BA" : "white"}
              color={activeMD === md ? "white" : "#4A5568"}
              border="1px solid #E2E8F0"
              fontSize="15px"
              fontWeight="600"
              _hover={{
                bg:
                  activeMD === md
                    ? "#2865A5"
                    : "#F7FAFC",
              }}
              onClick={() => setActiveMD(md)}
            >
              MD {md}
            </Button>
          ))}
        </HStack>
      </Box>

      {/* Manufacturer Details Card */}
      <Box
        bg="white"
        borderRadius="8px"
        p={{ base: 5, md: 8 }}
        width="100%"
        minH="550px"
        boxShadow="0 1px 4px rgba(0,0,0,0.12)"
      >
        {/* Details content */}
        <Box
          width="100%"
          mx="0"
        >
          {/* Heading */}
          <Text
            fontSize={{ base: "18px", md: "21px" }}
            fontWeight="700"
            color="#17365D"
            mb={6}
            textAlign="left"
          >
            Manufacturer details — MD {activeMD}
          </Text>

          <Box
            borderTop="1px solid #E5E7EB"
            mb={7}
          />

          {/* Form */}
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
                value={currentData.manufacturer}
                onChange={(value) =>
                  handleChange("manufacturer", value)
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
                value={currentData.manufacturerAddress}
                onChange={(value) =>
                  handleChange("manufacturerAddress", value)
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
                value={currentData.telephone}
                onChange={(value) =>
                  handleChange("telephone", value)
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
                value={currentData.fax}
                onChange={(value) =>
                  handleChange("fax", value)
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
                value={currentData.email}
                onChange={(value) =>
                  handleChange("email", value)
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
                value={currentData.contactPerson}
                onChange={(value) =>
                  handleChange("contactPerson", value)
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
                value={currentData.modelVariant}
                onChange={(value) =>
                  handleChange("modelVariant", value)
                }
              />
            </FormControl>
          </SimpleGrid>

          {/* Bottom buttons */}
          <Box
            borderTop="1px solid #E5E7EB"
            mt={10}
            pt={6}
          >
            <HStack>
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

              <Button
                variant="outline"
                size="md"
                px={7}
                fontSize="15px"
                onClick={() => {
                  setManufacturerData((prev) => ({
                    ...prev,
                    [activeMD]: {
                      ...emptyManufacturerData,
                    },
                  }));
                }}
              >
                Cancel
              </Button>
            </HStack>
          </Box>
        </Box>
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
    </Box>
  );
};

export default ManufacturerDetails;