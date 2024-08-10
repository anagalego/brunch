'use client'

import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
    Slider
} from "@nextui-org/react";
import { styles } from "@/styles";
import { best } from "@/best";
import { top } from "@/top";
import FilterCheckboxGroup from "./filters-form-fields/filters-checkbox-group";

export default function FiltersForm() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button fullWidth onPress={onOpen} color="primary">More Filters</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Filters
                </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <Slider 
                  label="Average price" 
                  step={1} 
                  maxValue={100} 
                  minValue={5} 
                  defaultValue={15}
                  className="max-w-md"
                />
                <FilterCheckboxGroup filterValues={styles} filterKey="style"/>
                <FilterCheckboxGroup filterValues={best} filterKey="best"/>
                <FilterCheckboxGroup filterValues={top} filterKey="top"/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Search
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
