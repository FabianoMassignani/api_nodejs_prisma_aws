import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

type AddEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [nome, setName] = useState("");
  const [cargo, setPosition] = useState("");
  const [departamento, setDepartment] = useState("");
  const [dataAdmissao, setStartDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = { nome, cargo, departamento, dataAdmissao };

    // await addEmployee(newEmployee);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Funcionário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id="nome" mb={3} isRequired>
              <FormLabel>Nome</FormLabel>
              <Input value={nome} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="cargo" mb={3} isRequired>
              <FormLabel>Cargo</FormLabel>
              <Input
                value={cargo}
                onChange={(e) => setPosition(e.target.value)}
              />
            </FormControl>
            <FormControl id="departamento" mb={3} isRequired>
              <FormLabel>Departamento</FormLabel>
              <Input
                value={departamento}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </FormControl>
            <FormControl id="dataAdmissao" mb={3} isRequired>
              <FormLabel>Data de Admissão</FormLabel>
              <Input
                type="date"
                value={dataAdmissao}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Adicionar Funcionário
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddEmployeeModal;
