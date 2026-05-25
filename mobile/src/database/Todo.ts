// src/database/Todo.ts
import { Model } from '@nozbe/watermelondb'
import { text, field, date } from '@nozbe/watermelondb/decorators'

export default class Todo extends Model {
    static table = 'todos'

    @text('text') text!: string
    @field('is_completed') isCompleted!: boolean
    @date('created_at') createdAt!: Date
    @date('updated_at') updatedAt!: Date
}