import childrenByFather from 'app/entities/children-by-father/children-by-father.reducer';
import childrenByMother from 'app/entities/children-by-mother/children-by-mother.reducer';
import member from 'app/entities/member/member.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  member,
  childrenByFather,
  childrenByMother,
  // jhipster-needle-add-reducer-combine - JHipster will add reducer here
};

export default entitiesReducers;
