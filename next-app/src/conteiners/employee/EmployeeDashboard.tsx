import { useEffect, useState } from "react";

import { getEmployees, deleteEmployee } from "../../lib/actions/employee";

import { Employee } from "../../types";
import { formatDate } from "../../utils";

import CustomButton from "../../components/button";
import CustomIconButton from "../../components/IconButton";
import LoadingSpinner from "../../components/loadingSpinner";
import DeleteAlert from "../../components/deleteAlert";
import AddEmployeeModal from "./forms/AddEmployeeModal";
import EditEmployeeModal from "./forms/EditEmployeeModal";

import { getOrderParams } from "../../utils/orderParams";

import { AddIcon, EditIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
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
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedEmployee, setEmployee] = useState<Employee | null>(null);
  const [SelectOrder, setSelectOrder] = useState("nomeasc");
  const [search, setSearch] = useState("");
  const [orderBy, setSortBy] = useState("nome");
  const [sortBy, setOrderBy] = useState("asc");

  const [searchTimeout, setSearchTimeout] =
    useState<ReturnType<typeof setTimeout>>();

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
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      onLoadEmployees();
    }, 800);

    setSearchTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [search, orderBy, sortBy]);

  const onLoadEmployees = async () => {
    setLoading(true);

    try {
      const res = await getEmployees(search, sortBy, orderBy);

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

    setDeleteAlertOpen(true);
    setEmployee(employee);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEmployee?._id) return;

    await deleteEmployee(selectedEmployee._id);
    await onLoadEmployees();
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { orderBy, sortBy } = getOrderParams(e.target.value);

    setOrderBy(orderBy);
    setSortBy(sortBy);
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Heading as="h1">Funcionários</Heading>
        <CustomButton icon={<AddIcon />} color="teal" onClick={onAddModalOpen}>
          Adicionar Funcionário
        </CustomButton>
      </Flex>

      <Flex alignItems="center" paddingBottom={4}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          mr={3}
        />

        <CustomIconButton
          label="reload Funcionário"
          icon={<RepeatIcon />}
          color="gray"
          onClick={() => onLoadEmployees()}
        />

        <Box display="inline-block" width="10px" />

        <Select
          value={SelectOrder}
          onChange={(e) => {
            setSelectOrder(e.target.value);
            handleOrderChange(e);
          }}
          width="200px"
        >
          <option value="nomeasc">Nome Asc </option>
          <option value="nomedesc">Nome Desc</option>
          <option value="cargoasc">Cargo Asc</option>
          <option value="cargodesc">Cargo Desc</option>
          <option value="departamentoasc">Departamento Asc</option>
          <option value="departamentodesc">Departamento Desc</option>
          <option value="dataAdmissaoasc">Data de Admissão Asc</option>
          <option value="dataAdmissaodesc">Data de Admissão Desc</option>
        </Select>
      </Flex>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Box>
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
        </Box>
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

      <DeleteAlert
        isOpen={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onDelete={() => {
          setDeleteAlertOpen(false);
          handleConfirmDelete();
        }}
      />
    </Box>
  );
};

export default EmployeeDashboard;
