using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using DataBaseWithBusinessLogicConnector.Properties;

namespace DataBaseWithBusinessLogicConnector.Entities
{
    public class OperationsGroup : IEntity, IOperation
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public User User { get; private set; }
        public decimal Amount { get; private set; }
        public string Description { get; private set; }
        public Frequency Frequency { get; private set; }
        public Importance Importance { get; private set; }
        public TransactionType TransactionType { get; private set; }
        public DateTime Date { get; private set; }
        public List<RelTag> Tags { get; private set; }
        public List<Operation> Operations { get; private set; }

        public OperationsGroup(int? id, User user, string description, Frequency frequency, Importance importance, DateTime date, List<RelTag> tags, List<Operation> operations)
        {
            Id = id;
            User = user;
            Description = description;
            Frequency = frequency;
            Importance = importance;
            Date = date;
            Tags = tags;
            Operations = operations;
        }

        public void SetOperations(IEnumerable<Operation> operations)
        {
            Operations = operations.ToList();
            IsDirty = true;
        }

        public void AddOperation(Operation operation)
        {
            Operations.Add(operation);
        }

        public void RemoveOperation(Operation operation)
        {
            Operations.Remove(operation);
        }

        public void RemoveAllOperations()
        {
            Operations.Clear();
        }

        public void SetTags(IEnumerable<RelTag> tags)
        {
            Tags = tags.ToList();
            IsDirty = true;
        }

        public void AddTag(RelTag tag)
        {
            if (Tags.All(t => t.Tag.Text != tag.Tag.Text))
            {
                tag.IsDirty = true;
                Tags.Add(tag);
            }
            else
            {
                var oldTag = Tags.Where(t => t.Tag.Text == tag.Tag.Text).First();
                oldTag.IsDirty = false;
                oldTag.IsMarkForDeletion = false;
            }
        }

        public void MarkTagForDeletion(RelTag tag)
        {
            var existTag = Tags.Where(t => t.Tag.Text == tag.Tag.Text).FirstOrDefault();
            existTag.IsDirty = true;
            existTag.IsMarkForDeletion = true;
        }

        public void MarkAllTagsForDeletion()
        {
            for (int i = 0; i < Tags.Count; i++)
            {
                RelTag tag = Tags[i];
                tag.IsDirty = true;
                tag.IsMarkForDeletion = true;
            }
        }

        public void SetFrequence(Frequency frequency)
        {
            Frequency = frequency;
            IsDirty = true;
        }

        public void SetImportance(Importance importance)
        {
            Importance = importance;
            IsDirty = true;
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }

        public override string ToString()
        {
            return Date.ToString("dd.MM.yyyy") + " " + Description;
        }

        public void SetDescription(string text)
        {
            Description = text;
            IsDirty = true;
        }

        public void SetDate(DateTime date)
        {
            Date = date;
            IsDirty = true;
        }

        public void UpdateAmount(List<TransactionType> types)
        {
            Amount = decimal.Zero;
            foreach(var item in Operations)
            {
                if (item.TransactionType.Text == Properties.strings.income)
                {
                    Amount += item.Amount;
                } else
                {
                    Amount -= item.Amount;
                }
            }
            if (Amount < 0)
            {
                TransactionType = types.First(t => t.Text == strings.expense);
                Amount = Math.Abs(Amount);
            }
            else
            {
                TransactionType = types.First(t => t.Text == strings.income);
            }
        }
    }
}
