// Complete the Index page component for a basic Todo application
import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleAddTask = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No task entered",
        description: "Please enter a task before adding.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTask = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  return (
    <Box p={5}>
      <Box display="flex" mb={4}>
        <Input placeholder="Add a new task..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} />
        <Button onClick={handleAddTask} ml={2} colorScheme="blue">
          <FaPlus />
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} display="flex" alignItems="center" bg={task.isCompleted ? "green.100" : "gray.100"} p={2} borderRadius="md">
            <IconButton icon={<FaCheck />} onClick={() => handleToggleComplete(task.id)} colorScheme={task.isCompleted ? "green" : "gray"} aria-label="Complete task" mr={2} />
            <Text as={task.isCompleted ? "s" : "span"} flex="1">
              {task.text}
            </Text>
            <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} colorScheme="red" aria-label="Delete task" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
