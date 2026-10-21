import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { deleteEntity, getEntity } from './children-by-mother.reducer';

export const ChildrenByMotherDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id!));
    setLoadModal(true);
  }, []);

  const childrenByMotherEntity = useAppSelector(state => state.genie_gateway.childrenByMother.entity);
  const updateSuccess = useAppSelector(state => state.genie_gateway.childrenByMother.updateSuccess);

  const handleClose = () => {
    navigate('/children-by-mother');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(childrenByMotherEntity.id));
  };

  return (
    <Modal show onHide={handleClose}>
      <ModalHeader data-cy="childrenByMotherDeleteDialogHeading" closeButton>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="genieGatewayApp.childrenByMother.delete.question">
        <Translate contentKey="genieGatewayApp.childrenByMother.delete.question" interpolate={{ id: childrenByMotherEntity.id }}>
          Are you sure you want to delete this ChildrenByMother?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-childrenByMother" data-cy="entityConfirmDeleteButton" variant="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChildrenByMotherDeleteDialog;
