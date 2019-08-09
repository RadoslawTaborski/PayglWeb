﻿using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using DataBaseWithBusinessLogicConnector.Properties;

namespace DataBaseWithBusinessLogicConnector.Entities
{
    public class OperationsGroup : IEntity, IOperation
    {
        public int? Id { get; private set; }
        public User User { get; private set; }
        public decimal Amount { get; private set; }
        public string Description { get; private set; }
        public Frequency Frequency { get; private set; }
        public Importance Importance { get; private set; }
        public TransactionType TransactionType { get; private set; }
        public DateTime Date { get; private set; }
        public List<Tag> Tags { get; private set; }
        public List<Operation> Operations { get; private set; }

        public OperationsGroup(int? id, User user, string description, Frequency frequency, Importance importance, DateTime date, List<Tag> tags, List<Operation> operations)
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

        public void SetTags(IEnumerable<Tag> tags)
        {
            Tags = tags.ToList();
        }

        public void AddTag(Tag tag)
        {
            if (!Tags.Any(t => t.Text == tag.Text))
            {
                Tags.Add(tag);
            }
        }

        public void RemoveTag(Tag tag)
        {
            Tags.Remove(tag);
        }

        public void RemoveAllTags()
        {
            Tags.Clear();
        }

        public void SetFrequence(Frequency frequency)
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
            return Date.ToString("dd.MM.yyyy") + " " + Description;
        }

        public void SetDescription(string text)
        {
            Description = text;
        }

        public void SetDate(DateTime date)
        {
            Date = date;
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

        public void UpdateOperationsParent()
        {
            foreach(var operation in Operations)
            {
                operation.SetParent(this);
            }
        }
    }
}