import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import { getEmployees } from "../../lib/actions/employee";

type Employee = {
  _id: string;
  nome: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
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
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    getEmployees()
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setEmployees([]);
        setLoading(false);
        console.error(error);
      });
  }, []);

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    onEditModalOpen();
  };

  const handleDeleteEmployee = (employee: Employee) => {
    // Implemente a lógica para excluir o funcionário
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Heading as="h1">Funcionários</Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={onAddModalOpen}
        >
          Adicionar Funcionário
        </Button>
      </Flex>

      {loading ? (
        <p>Loading...</p>
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
                <Td>{employee.dataAdmissao}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit Employee"
                    icon={<EditIcon />}
                    mr={2}
                    onClick={() => handleEditEmployee(employee)}
                  />
                  <IconButton
                    aria-label="Delete Employee"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDeleteEmployee(employee)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <AddEmployeeModal isOpen={isAddModalOpen} onClose={onAddModalClose} />
      {selectedEmployee && (
        <EditEmployeeModal
          isOpen={isEditModalOpen}
          onClose={onEditModalClose}
          employee={selectedEmployee}
        />
      )}
    </Box>
  );
};

export default EmployeeList;
