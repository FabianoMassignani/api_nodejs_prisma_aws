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
  ModalFooter,
} from "@chakra-ui/react";

import { addEmployee } from "../../../lib/actions/employee";

type AddEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLoadEmployees: () => void;
};

const AddEmployeeModal = ({
  isOpen,
  onClose,
  onLoadEmployees,
}: AddEmployeeModalProps) => {
  const [nome, setName] = useState("");
  const [cargo, setPosition] = useState("");
  const [departamento, setDepartment] = useState("");
  const [dataAdmissao, setStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const newEmployee = { nome, cargo, departamento, dataAdmissao };

    try {
      await addEmployee(newEmployee);
      onLoadEmployees();
      onClose();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
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
                type="datetime-local"
                value={dataAdmissao}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormControl>

            <br />
            <ModalFooter>
              <Button type="submit" colorScheme="teal" isLoading={isLoading}>
                Adicionar Funcionário
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddEmployeeModal;
