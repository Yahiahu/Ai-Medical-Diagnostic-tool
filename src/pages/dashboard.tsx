import React, { useState } from 'react';
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Textarea, Button, VStack, Heading, Spinner, Text } from '@chakra-ui/react';
import { api } from '~/utils/api';

interface HealthData {
  symptoms: string;
  painLevel: number;
}

function Dashboard() {
    const prompt = api.medical.prompt.useMutation()
    const [data, setData] = useState<HealthData>({ symptoms: '', painLevel: 1 });
    const [diagnosis, setDiagnosis] = useState<string | null>(null);

    const updateData = (key: keyof HealthData, value: string | number) => {
      setData(prevData => ({ ...prevData, [key]: value }));
    };

    const handleSubmit = async () => {
        setDiagnosis(null);
        const { diagnosis } = await prompt.mutateAsync({painThreashold: data.painLevel, symptoms: data.symptoms});
        setDiagnosis(diagnosis);
    };

    return (
      <VStack spacing={6} padding={6}>
        <Heading as="h2" size="xl">Health Input Form</Heading>

        <Textarea 
          value={data.symptoms} 
          onChange={(event) => updateData('symptoms', event.target.value)} 
          placeholder="Describe your symptoms..." 
        />

        <Box width="50%">
          <Slider 
            defaultValue={data.painLevel} 
            min={1} 
            max={10} 
            step={1} 
            onChange={(value) => updateData('painLevel', value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              {data.painLevel}
            </SliderThumb>
          </Slider>
        </Box>

        <Button onClick={handleSubmit} isLoading={prompt.isLoading} isDisabled={prompt.isLoading}>Submit</Button>

        {prompt.isLoading && <Spinner />}
        {prompt.isError && <Text>Error!</Text>}
        {prompt.isSuccess && diagnosis && <Text>Diagnosis: {diagnosis}</Text>}
      </VStack>
    );
}

Dashboard.requireAuth = true;
export default Dashboard;