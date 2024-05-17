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

import { updateEmployee } from "../../lib/actions/employee";

import CustomButton from "../../components/button";

import { Employee } from "../../types";

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  onLoadEmployees: () => void;
}

const EditEmployeeModal = ({
  isOpen,
  onClose,
  employee,
  onLoadEmployees,
}: EditEmployeeModalProps) => {
  const [nome, setName] = useState("");
  const [cargo, setPosition] = useState("");
  const [departamento, setDepartment] = useState("");
  const [dataAdmissao, setStartDate] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.nome || "");
      setPosition(employee.cargo || "");
      setDepartment(employee.departamento || "");
      setStartDate(
        new Date(employee.dataAdmissao).toISOString().slice(0, 16) || ""
      );
    }
  }, [employee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employee._id) return;

    const updatedEmployee = { nome, cargo, departamento, dataAdmissao };

    await updateEmployee(employee._id, updatedEmployee);

    onLoadEmployees();
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
                type="datetime-local"
                value={dataAdmissao}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="teal" mr={3}>
              Salvar
            </Button>

            <CustomButton onClick={onClose}>Cancelar</CustomButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditEmployeeModal;
