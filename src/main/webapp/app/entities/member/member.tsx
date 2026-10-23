import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Translate, getPaginationState } from 'react-jhipster';
import { Link, useLocation } from 'react-router';

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { getEntities, reset } from './member.reducer';

export const Member = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const [sorting, setSorting] = useState(false);

  const memberList = useAppSelector(state => state.genie_gateway.member.entities);
  const loading = useAppSelector(state => state.genie_gateway.member.loading);
  const links = useAppSelector(state => state.genie_gateway.member.links);
  const updateSuccess = useAppSelector(state => state.genie_gateway.member.updateSuccess);

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
      <h2 id="member-heading" data-cy="MemberHeading">
        <Translate contentKey="genieGatewayApp.member.home.title">Members</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="genieGatewayApp.member.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/member/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="genieGatewayApp.member.home.createLabel">Create new Member</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={memberList ? memberList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {memberList?.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="genieGatewayApp.member.id">Id</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                  </th>
                  <th className="hand" onClick={sort('firstName')}>
                    <Translate contentKey="genieGatewayApp.member.firstName">First Name</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('firstName')} />
                  </th>
                  <th className="hand" onClick={sort('lastName')}>
                    <Translate contentKey="genieGatewayApp.member.lastName">Last Name</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('lastName')} />
                  </th>
                  <th className="hand" onClick={sort('description')}>
                    <Translate contentKey="genieGatewayApp.member.description">Description</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                  </th>
                  <th className="hand" onClick={sort('gender')}>
                    <Translate contentKey="genieGatewayApp.member.gender">Gender</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('gender')} />
                  </th>
                  <th className="hand" onClick={sort('dob')}>
                    <Translate contentKey="genieGatewayApp.member.dob">Dob</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('dob')} />
                  </th>
                  <th className="hand" onClick={sort('imageUrl')}>
                    <Translate contentKey="genieGatewayApp.member.imageUrl">Image Url</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('imageUrl')} />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {memberList.map(member => (
                  <tr key={`entity-${member.id}`} data-cy="entityTable">
                    <td>
                      <Button as={Link as any} to={`/member/${member.id}`} variant="link" size="sm">
                        {member.id}
                      </Button>
                    </td>
                    <td>{member.firstName}</td>
                    <td>{member.lastName}</td>
                    <td>{member.description}</td>
                    <td>
                      <Translate contentKey={`genieGatewayApp.Gender.${member.gender}`} />
                    </td>
                    <td>{member.dob}</td>
                    <td>{member.imageUrl}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button as={Link as any} to={`/member/${member.id}`} variant="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button as={Link as any} to={`/member/${member.id}/edit`} variant="primary" size="sm" data-cy="entityEditButton">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button
                          onClick={() => (globalThis.location.href = `/member/${member.id}/delete`)}
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
                <Translate contentKey="genieGatewayApp.member.home.notFound">No Members found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Member;
