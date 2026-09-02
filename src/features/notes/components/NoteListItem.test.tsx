import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { NoteListItem } from './NoteListItem';

const note = {
  id: 'note-1',
  title: 'First note',
  content: 'This is the note content',
  createdAt: '2026-09-01T00:00:00.000Z',
  updatedAt: '2026-09-01T00:00:00.000Z',
};

describe('NoteListItem', () => {
  it('renders the note title and content', () => {
    render(
      <NoteListItem
        note={note}
        isSelected={false}
        onSelect={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: 'First note' })).toBeInTheDocument();
    expect(screen.getByText('This is the note content')).toBeInTheDocument();
  });

  it('shows fallback text when title and content are empty', () => {
    render(
      <NoteListItem
        note={{ ...note, title: '', content: '' }}
        isSelected={false}
        onSelect={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Untitled' })).toBeInTheDocument();
    expect(screen.getByText('No content')).toBeInTheDocument();
  });

  it('calls onSelect with the note id when the Select button is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <NoteListItem
        note={note}
        isSelected={false}
        onSelect={onSelect}
        onDelete={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Select' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('note-1');
  });

  it('calls onDelete with the note id when the Delete button is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <NoteListItem
        note={note}
        isSelected={true}
        onSelect={vi.fn()}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith('note-1');
  });
});
