import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './children-by-father.reducer';

export const ChildrenByFatherDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const childrenByFatherEntity = useAppSelector(state => state.genie_gateway.childrenByFather.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="childrenByFatherDetailsHeading">
          <Translate contentKey="genieGatewayApp.childrenByFather.detail.title">ChildrenByFather</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{childrenByFatherEntity.id}</dd>
          <dt>
            <span id="fatherId">
              <Translate contentKey="genieGatewayApp.childrenByFather.fatherId">Father Id</Translate>
            </span>
          </dt>
          <dd>{childrenByFatherEntity.fatherId}</dd>
          <dt>
            <span id="childId">
              <Translate contentKey="genieGatewayApp.childrenByFather.childId">Child Id</Translate>
            </span>
          </dt>
          <dd>{childrenByFatherEntity.childId}</dd>
          <dt>
            <span id="motherId">
              <Translate contentKey="genieGatewayApp.childrenByFather.motherId">Mother Id</Translate>
            </span>
          </dt>
          <dd>{childrenByFatherEntity.motherId}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="genieGatewayApp.childrenByFather.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{childrenByFatherEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="genieGatewayApp.childrenByFather.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{childrenByFatherEntity.lastName}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="genieGatewayApp.childrenByFather.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{childrenByFatherEntity.gender}</dd>
          <dt>
            <span id="dob">
              <Translate contentKey="genieGatewayApp.childrenByFather.dob">Dob</Translate>
            </span>
          </dt>
          <dd>{childrenByFatherEntity.dob}</dd>
        </dl>
        <Button as={Link as any} to="/children-by-father" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/children-by-father/${childrenByFatherEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ChildrenByFatherDetail;
