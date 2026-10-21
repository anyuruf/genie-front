import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './member.reducer';

export const MemberDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const memberEntity = useAppSelector(state => state.genie_gateway.member.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="memberDetailsHeading">
          <Translate contentKey="genieGatewayApp.member.detail.title">Member</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="genieGatewayApp.member.id">Id</Translate>
            </span>
          </dt>
          <dd>{memberEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="genieGatewayApp.member.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{memberEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="genieGatewayApp.member.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{memberEntity.lastName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="genieGatewayApp.member.description">Description</Translate>
            </span>
          </dt>
          <dd>{memberEntity.description}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="genieGatewayApp.member.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{memberEntity.gender}</dd>
          <dt>
            <span id="dob">
              <Translate contentKey="genieGatewayApp.member.dob">Dob</Translate>
            </span>
          </dt>
          <dd>{memberEntity.dob}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="genieGatewayApp.member.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{memberEntity.imageUrl}</dd>
        </dl>
        <Button as={Link as any} to="/member" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/member/${memberEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MemberDetail;
