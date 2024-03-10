// EmptyComponent.tsx

import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react";

import { SnsGovernanceCanister } from "@dfinity/sns";

// import { AgGridReact } from "@ag-grid-community/react";

const DemoComponent: React.FC = () => {
  const [neuronIds, setNeuronIds] = useState<any>([]);

  const [neuronData, setNeuronData] = useState<any[]>([]);

 const [finalData, setFinalData]= useState<any>({});

  useEffect(() => {
    const rootGovernanceCanisterId = Principal.fromText(
      "umz53-fiaaa-aaaaq-aabmq-cai"
    );
    console.log("rootGovernanceCanisterId", rootGovernanceCanisterId);
    const { listNeurons, getNeuron } = SnsGovernanceCanister.create({
      canisterId: rootGovernanceCanisterId,
    });
    const fetchData = async () => {
      let startPageAt;
      let fetchedNeuronIds: string[] = [];
      try {
        let stop = false;

        // const neuronData = await listNeurons({ limit: 100 });
        // neuronData.forEach((neuron) => {
        //   return fetchedNeuronIds.push(neuron?.id[0]);
        // });
        while (!stop) {
            let neuronData: any[] = [];
            if (startPageAt) {
                neuronData = await listNeurons({
                    // @ts-ignore
                    beforeNeuronId: startPageAt,
                    limit: 100,
                });
            } else {
                neuronData = await listNeurons({ limit: 100 });
            }
            if (neuronData.length !== 100) {
                stop = true; // Stop if no more data
            } else {
                // Extracting ids and adding them to the array
                neuronData.forEach((neuron) => {
                    fetchedNeuronIds.push(neuron?.id[0]);
                });
                startPageAt = fetchedNeuronIds[fetchedNeuronIds.length - 1]; // Increment start page
            }
        }
        // Set the state only after all data is fetched
        setNeuronIds(fetchedNeuronIds);
      } catch (error) {
        console.error("Error fetching neuron data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const rootGovernanceCanisterId = Principal.fromText(
      "umz53-fiaaa-aaaaq-aabmq-cai"
    );
    const { getNeuron } = SnsGovernanceCanister.create({
      canisterId: rootGovernanceCanisterId,
    });

    const batchSize = 100; // Adjust the batch size as needed
    const batchedNeuronIds: any[] = [];

    for (let i = 0; i < neuronIds.length; i += batchSize) {
      batchedNeuronIds.push(neuronIds.slice(i, i + batchSize));
    }

    const fetchedNeuronData = async () => {
      try {
        const allNeuronData = [];
        for (const batch of batchedNeuronIds) {
          const neuronDataPromises = batch.map(async (neuronId: any) => {
            console.log("neuronId Skayy ji", neuronId);
            const neuron = await getNeuron({ neuronId });
            return neuron;
          });
          console.log("Batch of neuron data:", neuronDataPromises);
          const batchNeuronData = await Promise.all(neuronDataPromises);
          allNeuronData.push(...batchNeuronData);
        }
        setNeuronData(allNeuronData);
      } catch (error) {
        console.error("Error fetching neuron data:", error);
      }
    };
    if (neuronIds.length > 0) {
      fetchedNeuronData();
    }
  }, [neuronIds.length]);


  interface Neuron {
    source_nns_neuron_id: BigInt[];
    followees: any[]; // Assuming the followees data structure
}

  useEffect(() => {
    type TransformedNeuronData = { [key: string]: number };

    const transformNeuronData = (neuronData: Neuron[]): TransformedNeuronData => {
        const transformedData: TransformedNeuronData = {};
        
        neuronData.forEach(neuron => {
            const sourceNnsNeuronId: any = neuron.source_nns_neuron_id[0]; // Assuming there's only one source neuron ID
            const followeesCount: number = neuron.followees? neuron.followees[0][1]?.followees.length:0;
            
            transformedData[sourceNnsNeuronId] = followeesCount;
        });
        
        return transformedData;
    };
    const transformedNeuronData: TransformedNeuronData = transformNeuronData(neuronData);
    setFinalData(transformedNeuronData);
  }, [neuronData])
  

  console.log("Neurons IDs SKKKKSKS", neuronData, neuronIds, finalData);
  return <div style={{ width: "100%", height: "100vh" }}></div>;
};

export default DemoComponent;
