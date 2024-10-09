import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Checkbox,
  FormControl,
  FormLabel,
  useDisclosure
} from '@chakra-ui/react';

interface CreateFormModalProps {
  productName: string;
  setProductName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  price: number;
  setPrice: (value: number) => void;
  available: boolean;
  setAvailable: (value: boolean) => void;
  handleRegisterProduct: () => void;
}

function CreateFormModal({
  productName,
  setProductName,
  description,
  setDescription,
  price,
  setPrice,
  available,
  setAvailable,
  handleRegisterProduct
}: CreateFormModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>Registrar Produto</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="70%">
          <ModalHeader>Registrar produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <FormControl mb={4}>
              <FormLabel>Nome do Produto</FormLabel>
              <Input
                placeholder='Digite o nome do Produto'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                placeholder='Digite a descrição do produto'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Valor do produto</FormLabel>
              <Input
                type='number' 
                placeholder='0'
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </FormControl>

            <FormControl mb={4}>
              <Checkbox
                isChecked={available}
                onChange={(e) => setAvailable(e.target.checked)}
              >
                Disponível para venda
              </Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              onClick={() => {
                handleRegisterProduct();
                onClose();  
              }}
            >
              Registrar produto
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateFormModal;
