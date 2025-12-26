import { type FilterValues } from '../pages/TaskList';

interface FilterGroupProps {
  onFilter: (filterName: FilterValues) => void;
  selectedFilter: FilterValues;
}

export function FilterGroup({ selectedFilter, onFilter }: FilterGroupProps) {
  return (
    <div>
      <label>
        <input
          type='radio'
          name='fruit'
          value='all'
          checked={selectedFilter === 'all'}
          onChange={() => onFilter('all')}
        />{' '}
        All
      </label>
      <label>
        <input
          type='radio'
          name='fruit'
          value='pending'
          checked={selectedFilter === 'pending'}
          onChange={() => onFilter('pending')}
        />{' '}
        Pending
      </label>
      <label>
        <input
          type='radio'
          name='fruit'
          value='completed'
          checked={selectedFilter === 'completed'}
          onChange={() => onFilter('completed')}
        />{' '}
        Completed
      </label>
    </div>
  );
}
