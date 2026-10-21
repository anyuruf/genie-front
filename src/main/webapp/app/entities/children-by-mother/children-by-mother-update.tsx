import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Gender } from 'app/shared/model/enumerations/gender.model';

import { createEntity, getEntity, updateEntity } from './children-by-mother.reducer';

export const ChildrenByMotherUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const childrenByMotherEntity = useAppSelector(state => state.genie_gateway.childrenByMother.entity);
  const loading = useAppSelector(state => state.genie_gateway.childrenByMother.loading);
  const updating = useAppSelector(state => state.genie_gateway.childrenByMother.updating);
  const updateSuccess = useAppSelector(state => state.genie_gateway.childrenByMother.updateSuccess);
  const genderValues = Object.keys(Gender);

  const handleClose = () => {
    navigate('/children-by-mother');
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
      ...childrenByMotherEntity,
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
          ...childrenByMotherEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="genieGatewayApp.childrenByMother.home.createOrEditLabel" data-cy="ChildrenByMotherCreateUpdateHeading">
            <Translate contentKey="genieGatewayApp.childrenByMother.home.createOrEditLabel">Create or edit a ChildrenByMother</Translate>
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
                  id="children-by-mother-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('genieGatewayApp.childrenByMother.motherId')}
                id="children-by-mother-motherId"
                name="motherId"
                data-cy="motherId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('genieGatewayApp.childrenByMother.childId')}
                id="children-by-mother-childId"
                name="childId"
                data-cy="childId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('genieGatewayApp.childrenByMother.fatherId')}
                id="children-by-mother-fatherId"
                name="fatherId"
                data-cy="fatherId"
                type="text"
              />
              <ValidatedField
                label={translate('genieGatewayApp.childrenByMother.firstName')}
                id="children-by-mother-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('genieGatewayApp.childrenByMother.lastName')}
                id="children-by-mother-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('genieGatewayApp.childrenByMother.gender')}
                id="children-by-mother-gender"
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
                label={translate('genieGatewayApp.childrenByMother.dob')}
                id="children-by-mother-dob"
                name="dob"
                data-cy="dob"
                type="text"
              />
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/children-by-mother" replace variant="info">
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

export default ChildrenByMotherUpdate;
