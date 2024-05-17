import { useEffect, useState } from "react";

import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";

import { getEmployees, deleteEmployee } from "../../lib/actions/employee";

import { Employee } from "../../types";
import { formatDate } from "../../utils";

import CustomButton from "../../components/button";
import CustomIconButton from "../../components/IconButton";
import LoadingSpinner from "../../components/loadingSpinner";

import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setEmployee] = useState<Employee | null>(null);

  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  useEffect(() => {
    onLoadEmployees();
  }, []);

  const onLoadEmployees = async () => {
    setLoading(true);
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEmployee(employee);

    if (employee) {
      onEditModalOpen();
    }
  };

  const handleDeleteEmployee = (employee: Employee) => {
    if (!employee._id) return;

    deleteEmployee(employee._id).then(() => {
      onLoadEmployees();
    });
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Heading as="h1">Funcionários</Heading>
        <CustomButton icon={<AddIcon />} color="teal" onClick={onAddModalOpen}>
          Adicionar Funcionário
        </CustomButton>
      </Flex>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>cargo</Th>
              <Th>Departamento</Th>
              <Th>Data de admissão</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee) => (
              <Tr key={employee._id}>
                <Td>{employee.nome}</Td>
                <Td>{employee.cargo}</Td>
                <Td>{employee.departamento}</Td>
                <Td>{formatDate(employee.dataAdmissao)}</Td>
                <Td>
                  <CustomIconButton
                    label="Editar Funcionário"
                    icon={<EditIcon />}
                    color="teal"
                    onClick={() => handleEditEmployee(employee)}
                  />
                  <Box display="inline-block" width="10px" />
                  <CustomIconButton
                    
                    label="Deletar Funcionário"
                    icon={<DeleteIcon />}
                    color="red"
                    onClick={() => handleDeleteEmployee(employee)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        onLoadEmployees={onLoadEmployees}
      />

      {selectedEmployee && (
        <EditEmployeeModal
          isOpen={isEditModalOpen}
          onClose={onEditModalClose}
          employee={selectedEmployee}
          onLoadEmployees={onLoadEmployees}
        />
      )}
    </Box>
  );
};

export default EmployeeList;
