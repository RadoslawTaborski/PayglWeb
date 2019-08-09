﻿using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataBaseWithBusinessLogicConnector.Entities
{
    public class Operation : IEntity, IOperation
    {
        public int? Id { get; private set; }
        public OperationsGroup Parent { get; private set; }
        public User User { get; private set; }
        public decimal Amount { get; private set; }
        public TransactionType TransactionType { get; private set; }
        public TransferType TransferType { get; private set; }
        public Frequency Frequency { get; private set; }
        public Importance Importance { get; private set; }
        public DateTime Date { get; private set; }
        public string ReceiptPath { get; private set; }
        public List<Tag> Tags { get; private set; }
        public List<OperationDetails> DetailsList { get; private set; }
        public string Description { get; private set; }
        public string ShortDescription { get; private set; }

        public Operation(int? id, OperationsGroup parent, User user, string description, decimal amount, TransactionType transactionType, TransferType transferType, Frequency frequency, Importance importance, DateTime date, string receiptPath, List<Tag> tags, List<OperationDetails> details)
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

        public void SetDetailsList(IEnumerable<OperationDetails> detailsCollection)
        {
            DetailsList = detailsCollection.ToList();
        }

        public void SetTags(IEnumerable<Tag> tags)
        {
            Tags = tags.ToList();
        }

        public void SetParent(OperationsGroup parent)
        {
            Parent?.RemoveOperation(this);
            Parent = parent;
            Parent?.AddOperation(this);
        }

        public void SetShortDescription(string newDescription)
        {
            ShortDescription = newDescription;
        }

        public void AddTag(Tag tag)
        {
            if (Tags.All(t => t.Text != tag.Text))
            {
                Tags.Add(tag);
            }
        }

        public void RemoveTag(Tag tag)
        {
            Tags.Remove(tag);
        }

        public void SetFrequency(Frequency frequency)
        {
            Frequency = frequency;
        }

        public void SetImportance(Importance importance)
        {
            Importance = importance;
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
        }

        public void SetTransaction(TransactionType transactionType)
        {
            TransactionType = transactionType;
        }

        public void SetTransfer(TransferType transferType)
        {
            TransferType = transferType;
        }

        public void SetDate(DateTime date)
        {
            Date = date;
        }

        public void SetAmount(decimal? value)
        {
            if (!value.HasValue) return;
            Amount = value.Value;
        }

        public void RemoveAllTags()
        {
            Tags.Clear();
        }
    }
}