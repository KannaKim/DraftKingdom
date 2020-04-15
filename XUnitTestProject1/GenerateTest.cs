using System;
using Xunit;
using LOL_pick_and_ban.Util;
using LOL_pick_and_ban.Models;
using System.Collections.Generic;
using Xunit.Extensions;
using System.Collections;
namespace XUnitTestProject1
{
    public class GenerateTest
    {
       
        [Theory, MemberData(nameof(GenerateRandomIDArgument))]
        public void GenerateRandomIDShouldWork(int digits, string[] ranges)
        {
            Assert.NotNull(Generate.GenerateRandomID(digits,ranges));
        }
        public static IEnumerable<object[]> GenerateRandomIDArgument
        {
            get
            {
                return new[]
                {
                    new object[]{ 10,new string[] { "a-z","0-9"}}
                };
            }
        }
        [Theory, MemberData(nameof(GenerateCharListInBetweenRangeShouldWorkArgument))]
        public void GenerateCharListInBetweenRangeShouldWork(string range, List<char> actual)
        {
            Assert.Equal(Generate.GenerateCharListInBetweenRange(range), actual);
        }
        public static IEnumerable<object[]> GenerateCharListInBetweenRangeShouldWorkArgument
        {
            get
            {
                return new[]
                {
                    new object[] {"a-c",new List<char>() { 'a','b','c'} },
                    new object[] {"c-e",new List<char>() { 'c','d','e'} },
                    new object[] { "7-9", new List<char>() { '7', '8', '9' } }
                };
            }
        }

    }
}
