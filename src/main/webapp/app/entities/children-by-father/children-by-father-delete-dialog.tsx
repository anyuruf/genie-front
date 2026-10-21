import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { deleteEntity, getEntity } from './children-by-father.reducer';

export const ChildrenByFatherDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id!));
    setLoadModal(true);
  }, []);

  const childrenByFatherEntity = useAppSelector(state => state.genie_gateway.childrenByFather.entity);
  const updateSuccess = useAppSelector(state => state.genie_gateway.childrenByFather.updateSuccess);

  const handleClose = () => {
    navigate('/children-by-father');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(childrenByFatherEntity.id));
  };

  return (
    <Modal show onHide={handleClose}>
      <ModalHeader data-cy="childrenByFatherDeleteDialogHeading" closeButton>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="genieGatewayApp.childrenByFather.delete.question">
        <Translate contentKey="genieGatewayApp.childrenByFather.delete.question" interpolate={{ id: childrenByFatherEntity.id }}>
          Are you sure you want to delete this ChildrenByFather?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-childrenByFather" data-cy="entityConfirmDeleteButton" variant="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChildrenByFatherDeleteDialog;
