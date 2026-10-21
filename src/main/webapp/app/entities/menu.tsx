import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/member">
        <Translate contentKey="global.menu.entities.member" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/children-by-father">
        <Translate contentKey="global.menu.entities.childrenByFather" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/children-by-mother">
        <Translate contentKey="global.menu.entities.childrenByMother" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
