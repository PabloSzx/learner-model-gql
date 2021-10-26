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
  ModalProps,
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
  modalProps,
}: {
  title: string;
  children: ReactNode | (() => ReactNode);
  onSubmit?: () => Promise<void>;
  triggerButton?: ButtonProps;
  saveButton?: ButtonProps;
  modalProps?: Partial<ModalProps>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Button onClick={onOpen} children={title} {...triggerButton} />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        {...modalProps}
      >
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
              {typeof children === "function" ? children() : children}
              <Button
                colorScheme="facebook"
                isDisabled={isLoading}
                isLoading={isLoading}
                leftIcon={<MdSave />}
                type="submit"
                children={title}
                {...saveButton}
              />
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
