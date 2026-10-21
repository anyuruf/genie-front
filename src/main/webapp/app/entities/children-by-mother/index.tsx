import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ChildrenByMother from './children-by-mother';
import ChildrenByMotherDeleteDialog from './children-by-mother-delete-dialog';
import ChildrenByMotherDetail from './children-by-mother-detail';
import ChildrenByMotherUpdate from './children-by-mother-update';

const ChildrenByMotherRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ChildrenByMother />} />
    <Route path="new" element={<ChildrenByMotherUpdate />} />
    <Route path=":id">
      <Route index element={<ChildrenByMotherDetail />} />
      <Route path="edit" element={<ChildrenByMotherUpdate />} />
      <Route path="delete" element={<ChildrenByMotherDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ChildrenByMotherRoutes;
