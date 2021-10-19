import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { MdCancel, MdSave } from "react-icons/md";

export function FormModal({
  title,
  children,
  onSubmit,
  triggerButton,
  saveButton,
}: {
  title: string;
  children: ReactNode;
  onSubmit?: () => Promise<void>;
  triggerButton?: ButtonProps;
  saveButton?: ButtonProps;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Button onClick={onOpen} {...triggerButton}>
        {title}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              as="form"
              onSubmit={async (ev) => {
                ev.preventDefault();
                setLoading(true);
                try {
                  await onSubmit?.();
                  onClose();
                } catch (err) {
                  console.error(err);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {children}
              <Button
                colorScheme="facebook"
                isDisabled={isLoading}
                isLoading={isLoading}
                leftIcon={<MdSave />}
                type="submit"
                {...saveButton}
              >
                {title}
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              leftIcon={<MdCancel />}
              colorScheme="gray"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
