import React, { useState } from "react";
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Textarea,
  Button,
  VStack,
  Heading,
  Spinner,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { api } from "~/utils/api";

interface HealthData {
  symptoms: string;
  medications: string;
  pastMedicalHistory: string;
  painLevel: number;
  age: number;
  gender: "male" | "female";
}

function Dashboard() {
  const prompt = api.medical.prompt.useMutation();
  const [data, setData] = useState<HealthData>({
    symptoms: "",
    medications: "",
    pastMedicalHistory: "",
    painLevel: 1,
    age: 0,
    gender: "male",
  });
  const [diagnosis, setDiagnosis] = useState<string | null>(null);

  const updateData = (
    key: keyof HealthData,
    value: string | number | boolean
  ) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async () => {
    setDiagnosis(null);
    const { diagnosis } = await prompt.mutateAsync({
      symptoms: data.symptoms,
      medications: data.medications,
      pastMedicalHistory: data.pastMedicalHistory,
      painThreashold: data.painLevel,
      age: data.age,
      gender: data.gender,
    });
    setDiagnosis(diagnosis);
  };

  return (
    <VStack spacing={6} padding={6}>
      <Heading as="h2" size="xl">
        Health Input Form
      </Heading>

      <Text mr={2} fontWeight="">
        The Symptom Tracker enables users to self-report their symptoms and gain
        insights into potential diagnoses. While it is essential to consult a
        medical professional for accurate diagnosis, this tool serves as a
        helpful resource to provide a general understanding of potential health
        concerns.
      </Text>
      <Box width="100%" display="flex" alignItems="center">
        <Textarea
          value={data.symptoms}
          onChange={(event) => updateData("symptoms", event.target.value)}
          placeholder="Symptoms:"
        />
      </Box>

      <Textarea
        value={data.medications}
        onChange={(event) => updateData("medications", event.target.value)}
        placeholder="Medications:"
      />

      <Textarea
        value={data.pastMedicalHistory}
        onChange={(event) =>
          updateData("pastMedicalHistory", event.target.value)
        }
        placeholder="Past Medical History:"
      />

      <Box width="50%">
        <Text mr={2} fontWeight="bold">
          Pain Level:
        </Text>
        <Slider
          defaultValue={data.painLevel}
          min={1}
          max={10}
          step={1}
          onChange={(value) => updateData("painLevel", value)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>{data.painLevel}</SliderThumb>
        </Slider>
      </Box>

      <Box width="50%">
        <Text mr={2} fontWeight="bold">
          Age:
        </Text>
        <Slider
          defaultValue={data.age}
          min={0}
          max={100}
          step={1}
          onChange={(value) => updateData("age", value)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>{data.age}</SliderThumb>
        </Slider>
      </Box>

      <Flex>
        <Button
          flex={1}
          size="lg"
          variant={data.gender === "male" ? "solid" : "outline"}
          colorScheme={data.gender === "male" ? "blue" : "gray"}
          onClick={() => updateData("gender", "male")}
        >
          Male
        </Button>

        <Button
          flex={1}
          size="lg"
          variant={data.gender === "female" ? "solid" : "outline"}
          colorScheme={data.gender === "female" ? "pink" : "gray"}
          onClick={() => updateData("gender", "female")}
        >
          Female
        </Button>
      </Flex>

      <Box>
        <Image
          src="https://t4.ftcdn.net/jpg/02/29/92/25/360_F_229922590_uEwxQo2UZx3tFjvuLFXA1G92Q2BoWlGG.jpg"
          alt="Image"
          maxWidth="200px"
          mt={6}
        />
      </Box>

      <Button
        size="lg"
        bg="#6F4FFF"
        color="#FFFFFF"
        fontWeight="bold"
        onClick={handleSubmit}
        isLoading={prompt.isLoading}
        isDisabled={prompt.isLoading}
      >
        Submit
      </Button>

      {prompt.isLoading && <Spinner />}
      {prompt.isError && <Text>Error!</Text>}
      {prompt.isSuccess && diagnosis && (
        <Text fontWeight="bold">
          <span style={{ fontWeight: "bold" }}></span> {diagnosis}
        </Text>
      )}
    </VStack>
  );
}

Dashboard.requireAuth = true;
export default Dashboard;
