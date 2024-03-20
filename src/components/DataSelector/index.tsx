import { useState } from "react";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

import { useCollection, useCollections } from "../../hooks";
import { Error } from "../generic";
import CollectionsSelect from "./CollectionsSelect";
import RendersOptionSelect from "./RendersOptionSelect";
import { LayerConfig } from "../../types";

type Props = {
  addLayer: (layerConfig: LayerConfig) => void
}

function DataSelector({ addLayer }: Props) {
  const { collections } = useCollections();

  const [ selectedCollection, setSelectedCollection ] = useState<string>();
  const { collection, error: collectionError } = useCollection(selectedCollection);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (config: LayerConfig) => {
    onClose();
    addLayer(config);
  }

  const displayError = collectionError;


  return (
    <Box mt="2" textAlign="right">
      <Button variant="link" onClick={onOpen}>Add layer</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb="4">
          <ModalHeader>Add data visualisation</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <CollectionsSelect
              collections={collections}
              selectedCollection={selectedCollection}
              setSelectedCollection={setSelectedCollection}
            />
            { collection && <RendersOptionSelect collection={collection} addLayer={handleSubmit} /> }
            { displayError && <Error>{ displayError }</Error> }
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DataSelector;
