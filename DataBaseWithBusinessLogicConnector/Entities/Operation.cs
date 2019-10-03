using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataBaseWithBusinessLogicConnector.Entities
{
    public class Operation : IEntity, IOperation
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public OperationsGroup Parent { get; private set; }
        public User User { get; private set; }
        public decimal Amount { get; private set; }
        public TransactionType TransactionType { get; private set; }
        public TransferType TransferType { get; private set; }
        public Frequency Frequency { get; private set; }
        public Importance Importance { get; private set; }
        public DateTime Date { get; private set; }
        public string ReceiptPath { get; private set; }
        public List<RelTag> Tags { get; private set; }
        public List<OperationDetails> DetailsList { get; private set; }
        public string Description { get; private set; }
        public string ShortDescription { get; private set; }

        public Operation(int? id, OperationsGroup parent, User user, string description, decimal amount, TransactionType transactionType, TransferType transferType, Frequency frequency, Importance importance, DateTime date, string receiptPath, List<RelTag> tags, List<OperationDetails> details)
        {
            Id = id;
            Parent = parent;
            User = user;
            Description = description;
            ShortDescription = description;
            Amount = amount;
            TransactionType = transactionType;
            TransferType = transferType;
            Frequency = frequency;
            Importance = importance;
            Date = date;
            ReceiptPath = receiptPath;
            Tags = tags;
            DetailsList = details;

            parent?.AddOperation(this);
        }

        public void SetParentAfterCreating(OperationsGroup parent)
        {
            Parent = parent;
        }

        public void SetDetailsList(IEnumerable<OperationDetails> detailsCollection)
        {
            DetailsList = detailsCollection.ToList();
        }

        public void SetTags(IEnumerable<RelTag> tags)
        {
            Tags = tags.ToList();
        }

        public void SetParent(OperationsGroup parent)
        {
            Parent?.RemoveOperation(this);
            Parent = parent;
            Parent?.AddOperation(this);
            IsDirty = true;
        }

        public void SetShortDescription(string newDescription)
        {
            ShortDescription = newDescription;
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

        public void SetFrequency(Frequency frequency)
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
            return Date.ToString(Properties.strings.dateFormat) + " " + Description;
        }

        public void SetDescription(string text)
        {
            Description = text;
            IsDirty = true;
        }

        public void SetTransaction(TransactionType transactionType)
        {
            TransactionType = transactionType;
            IsDirty = true;
        }

        public void SetTransfer(TransferType transferType)
        {
            TransferType = transferType;
            IsDirty = true;
        }

        public void SetDate(DateTime date)
        {
            Date = date;
            IsDirty = true;
        }

        public void SetAmount(decimal? value)
        {
            if (!value.HasValue) return;
            Amount = value.Value;
            IsDirty = true;
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
    }
}