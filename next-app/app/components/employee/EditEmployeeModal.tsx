import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

type Employee = {
  _id: string;
  nome: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
};

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const [nome, setName] = useState("");
  const [cargo, setPosition] = useState("");
  const [departamento, setDepartment] = useState("");
  const [dataAdmissao, setStartDate] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.nome);
      setPosition(employee.cargo);
      setDepartment(employee.departamento);
      setStartDate(employee.dataAdmissao);
    }
  }, [employee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEmployee = { nome, cargo, departamento, dataAdmissao };
    // Aqui você faria uma chamada à API para atualizar o funcionário
    // await updateEmployee(employee._id, updatedEmployee);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Funcionário</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="teal" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditEmployeeModal;
