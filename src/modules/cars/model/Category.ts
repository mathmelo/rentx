import { v4 as uuid } from 'uuid';

class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor({ name, description, created_at }) {
    if (!this.id) {
      this.id = uuid();
    }

    this.name = name;
    this.description = description;
    this.created_at = created_at;
  }
}

export { Category };
