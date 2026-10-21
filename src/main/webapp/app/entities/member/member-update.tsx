import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Gender } from 'app/shared/model/enumerations/gender.model';

import { createEntity, getEntity, updateEntity } from './member.reducer';

export const MemberUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const memberEntity = useAppSelector(state => state.genie_gateway.member.entity);
  const loading = useAppSelector(state => state.genie_gateway.member.loading);
  const updating = useAppSelector(state => state.genie_gateway.member.updating);
  const updateSuccess = useAppSelector(state => state.genie_gateway.member.updateSuccess);
  const genderValues = Object.keys(Gender);

  const handleClose = () => {
    navigate('/member');
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
    const entity = {
      ...memberEntity,
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
          ...memberEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="genieGatewayApp.member.home.createOrEditLabel" data-cy="MemberCreateUpdateHeading">
            <Translate contentKey="genieGatewayApp.member.home.createOrEditLabel">Create or edit a Member</Translate>
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
                  id="member-id"
                  label={translate('genieGatewayApp.member.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('genieGatewayApp.member.firstName')}
                id="member-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('genieGatewayApp.member.lastName')}
                id="member-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('genieGatewayApp.member.description')}
                id="member-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('genieGatewayApp.member.gender')}
                id="member-gender"
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
              <ValidatedField label={translate('genieGatewayApp.member.dob')} id="member-dob" name="dob" data-cy="dob" type="text" />
              <ValidatedField
                label={translate('genieGatewayApp.member.imageUrl')}
                id="member-imageUrl"
                name="imageUrl"
                data-cy="imageUrl"
                type="text"
              />
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/member" replace variant="info">
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

export default MemberUpdate;
