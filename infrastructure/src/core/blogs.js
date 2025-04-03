import { DeleteCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getTimestamp } from "../utils/utils";

const createBlog = async ({
  tableName,
  dynamo,
  name,
  title,
  description,
  content,
  genre,
  date,
  published,
  image,
  userName,
  by,
}) => {
  console.log("debug creating blog", name);
  const timestamp = getTimestamp();
  const input = {
    TableName: tableName,
    Item: {
      pk: "0",
      sk: `blog#name:${name}`,
      name,
      title,
      description,
      by,
      content,
      genre,
      date,
      published,
      image,
      createdBy: userName,
      createdOn: timestamp,
      updatedBy: userName,
      updatedOn: timestamp,
    },
    ConditionExpression:
      "attribute_not_exists(pk) AND attribute_not_exists(sk)",
  };

  console.log("debug input", JSON.stringify(input));
  try {
    await dynamo.send(new PutCommand(input));
    return name;
  } catch (error) {
    console.log("debug error creating blog:", error.message);
  }
};

const getBlogFromDB = async ({ tableName, dynamo, name }) => {
  console.log("debug get blog", name);
  const input = {
    TableName: tableName,
    KeyConditions: {
      pk: {
        AttributeValueList: ["0"],
        ComparisonOperator: "EQ",
      },
      sk: {
        AttributeValueList: [`blog#name:${name}`],
        ComparisonOperator: "BEGINS_WITH",
      },
    },
  };

  try {
    const { Items } = await dynamo.send(new QueryCommand(input));

    return Items[0];
  } catch (error) {
    console.log("debug error getting blog", error.message);
    throw error;
  }
};

const updateBlog = async ({
  dynamo,
  tableName,
  name,
  title,
  description,
  by,
  content,
  genre,
  date,
  published,
  image,
  userName,
}) => {
  console.log("debug update blog", name);
  const blog = await getBlogFromDB({ tableName, dynamo, name });

  const input = {
    TableName: tableName,
    Item: {
      ...blog,
      title,
      description,
      by,
      content,
      genre,
      date,
      published,
      image,
      updatedBy: userName,
      updatedOn: getTimestamp(),
    },
  };

  await dynamo.send(new PutCommand(input));

  return {
    name,
  };
};

const getBlog = async (payload) => {
  return getBlogFromDB(payload);
};

const listBlogs = async ({ tableName, dynamo, getAll }) => {
  console.log("debug list blogs");
  const result = [];
  let marker;

  const tempInput = {
    TableName: tableName,
    KeyConditions: {
      pk: {
        AttributeValueList: ["0"],
        ComparisonOperator: "EQ",
      },
      sk: {
        AttributeValueList: [`blog#name:`],
        ComparisonOperator: "BEGINS_WITH",
      },
    },
  };

  do {
    try {
      const input = {
        ...tempInput,
        ExclusiveStartKey: marker,
      };
      console.log("debug input", JSON.stringify(input));
      const { Items, LastEvaluatedKey } = await dynamo.send(
        new QueryCommand(input)
      );
      const filteredItems = Items.filter((item) => getAll || item.published);
      result.push(...filteredItems);
      marker = LastEvaluatedKey;
    } catch (error) {
      console.log("debug error listing blog", error.message);
      throw error;
    }
  } while (marker);

  return result;
};

const deleteBlog = async ({ tableName, dynamo, name }) => {
  console.log("debug delete blog", name);
  const input = {
    TableName: tableName,
    Keys: {
      pk: "0",
      sk: `blog#name:${name}`,
    },
  };

  await dynamo.send(new DeleteCommand(input));

  return {
    name,
  };
};

export default {
  createBlog,
  updateBlog,
  getBlog,
  listBlogs,
  deleteBlog,
};
