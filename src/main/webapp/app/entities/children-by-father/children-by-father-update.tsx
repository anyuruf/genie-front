import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Gender } from 'app/shared/model/enumerations/gender.model';

import { createEntity, getEntity, updateEntity } from './children-by-father.reducer';

export const ChildrenByFatherUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const childrenByFatherEntity = useAppSelector(state => state.genie_gateway.childrenByFather.entity);
  const loading = useAppSelector(state => state.genie_gateway.childrenByFather.loading);
  const updating = useAppSelector(state => state.genie_gateway.childrenByFather.updating);
  const updateSuccess = useAppSelector(state => state.genie_gateway.childrenByFather.updateSuccess);
  const genderValues = Object.keys(Gender);

  const handleClose = () => {
    navigate('/children-by-father');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...childrenByFatherEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          gender: 'MALE',
          ...childrenByFatherEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="genieGatewayApp.childrenByFather.home.createOrEditLabel" data-cy="ChildrenByFatherCreateUpdateHeading">
            <Translate contentKey="genieGatewayApp.childrenByFather.home.createOrEditLabel">Create or edit a ChildrenByFather</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm mode="all" defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="children-by-father-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('genieGatewayApp.childrenByFather.fatherId')}
                id="children-by-father-fatherId"
                name="fatherId"
                data-cy="fatherId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('genieGatewayApp.childrenByFather.childId')}
                id="children-by-father-childId"
                name="childId"
                data-cy="childId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('genieGatewayApp.childrenByFather.motherId')}
                id="children-by-father-motherId"
                name="motherId"
                data-cy="motherId"
                type="text"
              />
              <ValidatedField
                label={translate('genieGatewayApp.childrenByFather.firstName')}
                id="children-by-father-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('genieGatewayApp.childrenByFather.lastName')}
                id="children-by-father-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('genieGatewayApp.childrenByFather.gender')}
                id="children-by-father-gender"
                name="gender"
                data-cy="gender"
                type="select"
              >
                {genderValues.map(gender => (
                  <option value={gender} key={gender}>
                    {translate(`genieGatewayApp.Gender.${gender}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('genieGatewayApp.childrenByFather.dob')}
                id="children-by-father-dob"
                name="dob"
                data-cy="dob"
                type="text"
              />
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/children-by-father" replace variant="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button variant="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ChildrenByFatherUpdate;
