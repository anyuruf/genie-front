import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Translate, getPaginationState } from 'react-jhipster';
import { Link, useLocation } from 'react-router';

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { getEntities, reset } from './children-by-mother.reducer';

export const ChildrenByMother = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const [sorting, setSorting] = useState(false);

  const childrenByMotherList = useAppSelector(state => state.genie_gateway.childrenByMother.entities);
  const loading = useAppSelector(state => state.genie_gateway.childrenByMother.loading);
  const links = useAppSelector(state => state.genie_gateway.childrenByMother.links);
  const updateSuccess = useAppSelector(state => state.genie_gateway.childrenByMother.updateSuccess);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if (globalThis.scrollY > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const { order } = paginationState;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="children-by-mother-heading" data-cy="ChildrenByMotherHeading">
        <Translate contentKey="genieGatewayApp.childrenByMother.home.title">Children By Mothers</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="genieGatewayApp.childrenByMother.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/children-by-mother/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="genieGatewayApp.childrenByMother.home.createLabel">Create new Children By Mother</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={childrenByMotherList ? childrenByMotherList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {childrenByMotherList?.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="genieGatewayApp.childrenByMother.id">ID</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                  </th>
                  <th className="hand" onClick={sort('motherId')}>
                    <Translate contentKey="genieGatewayApp.childrenByMother.motherId">Mother Id</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('motherId')} />
                  </th>
                  <th className="hand" onClick={sort('childId')}>
                    <Translate contentKey="genieGatewayApp.childrenByMother.childId">Child Id</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('childId')} />
                  </th>
                  <th className="hand" onClick={sort('fatherId')}>
                    <Translate contentKey="genieGatewayApp.childrenByMother.fatherId">Father Id</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('fatherId')} />
                  </th>
                  <th className="hand" onClick={sort('firstName')}>
                    <Translate contentKey="genieGatewayApp.childrenByMother.firstName">First Name</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('firstName')} />
                  </th>
                  <th className="hand" onClick={sort('lastName')}>
                    <Translate contentKey="genieGatewayApp.childrenByMother.lastName">Last Name</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('lastName')} />
                  </th>
                  <th className="hand" onClick={sort('gender')}>
                    <Translate contentKey="genieGatewayApp.childrenByMother.gender">Gender</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('gender')} />
                  </th>
                  <th className="hand" onClick={sort('dob')}>
                    <Translate contentKey="genieGatewayApp.childrenByMother.dob">Dob</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('dob')} />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {childrenByMotherList.map(childrenByMother => (
                  <tr key={`entity-${childrenByMother.id}`} data-cy="entityTable">
                    <td>
                      <Button as={Link as any} to={`/children-by-mother/${childrenByMother.id}`} variant="link" size="sm">
                        {childrenByMother.id}
                      </Button>
                    </td>
                    <td>{childrenByMother.motherId}</td>
                    <td>{childrenByMother.childId}</td>
                    <td>{childrenByMother.fatherId}</td>
                    <td>{childrenByMother.firstName}</td>
                    <td>{childrenByMother.lastName}</td>
                    <td>
                      <Translate contentKey={`genieGatewayApp.Gender.${childrenByMother.gender}`} />
                    </td>
                    <td>{childrenByMother.dob}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button
                          as={Link as any}
                          to={`/children-by-mother/${childrenByMother.id}`}
                          variant="info"
                          size="sm"
                          data-cy="entityDetailsButton"
                        >
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button
                          as={Link as any}
                          to={`/children-by-mother/${childrenByMother.id}/edit`}
                          variant="primary"
                          size="sm"
                          data-cy="entityEditButton"
                        >
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button
                          onClick={() => (globalThis.location.href = `/children-by-mother/${childrenByMother.id}/delete`)}
                          variant="danger"
                          size="sm"
                          data-cy="entityDeleteButton"
                        >
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="genieGatewayApp.childrenByMother.home.notFound">No Children By Mothers found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ChildrenByMother;
