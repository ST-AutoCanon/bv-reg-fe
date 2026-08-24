import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Input,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
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
import { BusFormData } from "../formData/BusFormData";

type TabType =
  | "Tyre"
  | "Wheel Rim"
  | "Wheel Nut"
  | "TPMS";

const tabNames: TabType[] = [
  "Tyre",
  "Wheel Rim",
  "Wheel Nut",
  "TPMS",
];

const tabKeyMap: Record<
  TabType,
  keyof BusFormData["tyreAndWheelRim"]
> = {
  Tyre: "tyre",
  "Wheel Rim": "wheelRim",
  "Wheel Nut": "wheelNut",
  TPMS: "tpms",
};


type BusTyreWheelPageProps = {
  data: BusFormData["tyreAndWheelRim"];

  onSave: (
    data: BusFormData["tyreAndWheelRim"]
  ) => void;
};

type DetailsFormProps = {
  tabName: TabType;
  formData: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

const DetailsForm: React.FC<DetailsFormProps> = ({
  tabName,
  formData,
  onInputChange,
  onSave,
  onCancel,
}) => {
  const tabFields: Record<TabType, string[]> = {
    Tyre: [
      "Tyre Size",
      "Tyre Type",
      "Tyre Make",
      "Tyre Model",
      "Load Index",
      "Speed Rating",
    ],

    "Wheel Rim": [
      "Rim Size",
      "Rim Type",
      "Rim Make",
      "Rim Model",
    ],

    "Wheel Nut": [
      "Nut Size",
      "Nut Type",
      "Nut Make",
      "Nut Model",
    ],

    TPMS: [
      "Sensor Type",
      "Sensor Make",
      "Sensor Model",
      "Sensor ID",
    ],
  };

  const fields = tabFields[tabName];

  return (
    <Box width="100%">
      <Text
        fontSize="20px"
        fontWeight="700"
        mb={5}
        color="#1A202C"
      >
        {tabName} Details
      </Text>

      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
        }}
        gap={5}
      >
        {fields.map((field) => {
          const fieldKey = field
            .replace(/\s+/g, "")
            .replace(/^(.)/, (match) =>
              match.toLowerCase()
            );

          return (
            <FormControl key={field}>
              <FormLabel
                fontSize="14px"
                fontWeight="600"
                color="#1A202C"
              >
                {field}
              </FormLabel>

              <Input
                height="42px"
                value={formData[fieldKey] || ""}
                onChange={(e) =>
                  onInputChange(
                    fieldKey,
                    e.target.value
                  )
                }
                borderColor="#CBD5E0"
                borderRadius="5px"
                _focus={{
                  borderColor: "#3273BD",
                  boxShadow:
                    "0 0 0 1px #3273BD",
                }}
              />
            </FormControl>
          );
        })}
      </Box>

      <HStack
        spacing={4}
        mt={8}
        justifyContent="flex-end"
      >
        <Button
          variant="outline"
          borderColor="#3273BD"
          color="#3273BD"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          bg="#3273BD"
          color="white"
          onClick={onSave}
          _hover={{
            bg: "#2861A0",
          }}
        >
          Save
        </Button>
      </HStack>
    </Box>
  );
};

const BusTyreWheelPage: React.FC<BusTyreWheelPageProps> = ({
  data,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [clickedTab, setClickedTab] = useState<number>(0);

  const [formData, setFormData] =
  useState<BusFormData["tyreAndWheelRim"]>(data);

  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();

const currentTab = tabNames[activeTab];
const currentKey = tabKeyMap[currentTab];
  /* ================= LOAD DATA FROM PARENT ================= */

  useEffect(() => {
    setFormData(data);
  }, [data]);

  /* ================= INPUT CHANGE ================= */

  const handleInputChange = (
  field: string,
  value: string
) => {
  setFormData((prev) => ({
    ...prev,
    [currentKey]: {
      ...prev[currentKey],
      [field]: value,
    },
  }));
};

  /* ================= SAVE ================= */

  const handleSave = () => {
    console.log(
      "Tyre and Wheel Rim Data:",
      formData
    );

    // Send all tab data to parent
    onSave(formData);

    // Success popup
    onSuccessOpen();
  };

  /* ================= CANCEL ================= */

  const handleCancel = () => {
  setFormData((prev) => ({
    ...prev,
    [currentKey]: {
      ...data[currentKey],
    },
  }));
};

  return (
    <Box width="100%">
      {/* ================= TABS ================= */}

      <Tabs
        index={activeTab}
        onChange={(index) => {
          setActiveTab(index);
          setClickedTab(index);
        }}
      >
        <TabList>
          {tabNames.map((tab, index) => (
            <Tab key={tab}>
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {tabNames.map((tab) => (
            <TabPanel key={tab} px={0}>
              <DetailsForm
  tabName={tab}
  formData={formData[tabKeyMap[tab]]}
  onInputChange={handleInputChange}
  onSave={handleSave}
  onCancel={handleCancel}
/>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>

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

export default BusTyreWheelPage;