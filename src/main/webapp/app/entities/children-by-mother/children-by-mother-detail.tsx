import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './children-by-mother.reducer';

export const ChildrenByMotherDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const childrenByMotherEntity = useAppSelector(state => state.genie_gateway.childrenByMother.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="childrenByMotherDetailsHeading">
          <Translate contentKey="genieGatewayApp.childrenByMother.detail.title">ChildrenByMother</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{childrenByMotherEntity.id}</dd>
          <dt>
            <span id="motherId">
              <Translate contentKey="genieGatewayApp.childrenByMother.motherId">Mother Id</Translate>
            </span>
          </dt>
          <dd>{childrenByMotherEntity.motherId}</dd>
          <dt>
            <span id="childId">
              <Translate contentKey="genieGatewayApp.childrenByMother.childId">Child Id</Translate>
            </span>
          </dt>
          <dd>{childrenByMotherEntity.childId}</dd>
          <dt>
            <span id="fatherId">
              <Translate contentKey="genieGatewayApp.childrenByMother.fatherId">Father Id</Translate>
            </span>
          </dt>
          <dd>{childrenByMotherEntity.fatherId}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="genieGatewayApp.childrenByMother.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{childrenByMotherEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="genieGatewayApp.childrenByMother.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{childrenByMotherEntity.lastName}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="genieGatewayApp.childrenByMother.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{childrenByMotherEntity.gender}</dd>
          <dt>
            <span id="dob">
              <Translate contentKey="genieGatewayApp.childrenByMother.dob">Dob</Translate>
            </span>
          </dt>
          <dd>{childrenByMotherEntity.dob}</dd>
        </dl>
        <Button as={Link as any} to="/children-by-mother" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/children-by-mother/${childrenByMotherEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ChildrenByMotherDetail;
